import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { NetworkWaterLevelData, SensorWaterLevel, MetricData, SensorBattery, SensorSignal, NetworkBatteryLevelData, NetworkSignalStrengthData, MetricUpdateData } from '../../interfaces/sensorInfo';
import { getAllLocationsMetric, getLocationMetric } from '../../services/sensors';
import { SensorsMetricsState } from '../../interfaces/redux';
import { RootState } from '../store';
import { isMetricDeltaInfo } from '../../utils/queryUtils';


const initialState: SensorsMetricsState = {
  waterLevelData: {},
  batteryLevelData: {},
  signalStrengthData: {},
  lastUpdateDate: null,
  loading: false,
  error: null,
};

// TODO: Manejar Excepciones y errores
export const fetchInitialMetricUpdate = createAsyncThunk(
  'metrics/fetchAll',
  async ({ from, to }: { from: Date; to: Date }) => {

    const deltaWaterLevel: SensorWaterLevel  = await getAllLocationsMetric("delta-parana", "WATER_LEVEL", from, to)
    const prevenirWaterLevel: SensorWaterLevel = await getAllLocationsMetric("prevenir", "WATER_LEVEL", from, to)

    const deltaBatteryLevel: SensorBattery = await getAllLocationsMetric("delta-parana", "BATTERY_LEVEL", from, to)
    
    const deltaSignalStrength: SensorSignal = await getAllLocationsMetric("delta-parana", "SIGNAL_STRENGTH", from, to)

    const waterLevelData: NetworkWaterLevelData = {"delta-parana": deltaWaterLevel, "prevenir": prevenirWaterLevel}
    const batteryLevelData: NetworkBatteryLevelData = {"delta-parana": deltaBatteryLevel, "prevenir": {}}
    const signalStrengthData: NetworkSignalStrengthData = {"delta-parana": deltaSignalStrength, "prevenir": {}}

    const metricData = {waterLevel: waterLevelData, batteryLevel: batteryLevelData, signalStrength: signalStrengthData}

    localStorage.setItem("networkMetrics", JSON.stringify({"last_update_date": to.toISOString(), "data": metricData}))

    return {lastUpdateDate: to, data: metricData};
  }
);

export const fetchMetricUpdateBySensor = createAsyncThunk(
  'metrics/fetchLocation',
  async (
    { from, to, ubicacion, red, sensors }: { from: Date; to: Date; ubicacion: string; red: "delta-parana" | "prevenir"; sensors: string[] },
    { getState }
  ) => {
    const currentState = getState() as RootState;

    // Datos actuales en el estado
    const currentWaterLevelBySensors = currentState.sensorsMetrics.waterLevelData[red];
    const currentBatteryLevelBySensors = red === "delta-parana" ? currentState.sensorsMetrics.batteryLevelData[red] : {};
    const currentSignalStrengthBySensors = red === "delta-parana" ? currentState.sensorsMetrics.signalStrengthData[red] : {};

    // Nuevos datos a buscar
    const waterLevel: SensorWaterLevel = await getLocationMetric(red, "WATER_LEVEL", from, to, ubicacion);
    const batteryLevel: SensorBattery = red === "delta-parana" ? await getLocationMetric(red, "BATTERY_LEVEL", from, to, ubicacion) : {};
    const signalStrength: SensorSignal = red === "delta-parana" ? await getLocationMetric(red, "SIGNAL_STRENGTH", from, to, ubicacion) : {};

    // Función para combinar datos y eliminar duplicados
    const combineAndRemoveDuplicates = (currentData: any, newData: any) => {
      const combinedData = {};

      sensors.forEach(sensorId => {
        const currentDataPoints = currentData[sensorId] || [];
        const newDataPoints = newData[sensorId] || [];

        const allDataPoints = [...currentDataPoints, ...newDataPoints];
        const uniqueDataPoints = Array.from(
          new Map(
            allDataPoints.map(dp => [
              isMetricDeltaInfo(dp) ? dp.hora : dp.time, // Usa `hora` si es `MetricDeltaInfo`, de lo contrario `time`
              dp
            ])
          ).values()
        );

        combinedData[sensorId] = uniqueDataPoints;
      });

      return combinedData;
    };

    // Combinar y limpiar duplicados en cada tipo de métrica
    const combinedWaterLevelData = combineAndRemoveDuplicates(currentWaterLevelBySensors, waterLevel);
    const combinedBatteryLevelData = red === "delta-parana" ? combineAndRemoveDuplicates(currentBatteryLevelBySensors, batteryLevel) : {};
    const combinedSignalStrengthData = red === "delta-parana" ? combineAndRemoveDuplicates(currentSignalStrengthBySensors, signalStrength) : {};

    // Crear la estructura completa de MetricData con las redes
    const metricData: MetricData = {
      waterLevel: { "delta-parana": red === "delta-parana" ? combinedWaterLevelData : {}, "prevenir": red === "prevenir" ? combinedWaterLevelData : {} },
      batteryLevel: { "delta-parana": combinedBatteryLevelData, "prevenir": {} },
      signalStrength: { "delta-parana": combinedSignalStrengthData, "prevenir": {} }
    };

    return { data: metricData, sensors };
  }
);



const sensorMetricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<MetricData>) => {
      state.waterLevelData = action.payload.waterLevel;
      state.batteryLevelData = action.payload.batteryLevel;
      state.signalStrengthData = action.payload.signalStrength;
  },
  setLastUpdateDate: (state, action: PayloadAction<string>) => {
    state.lastUpdateDate = action.payload;
  }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialMetricUpdate.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInitialMetricUpdate.fulfilled, (state, action: PayloadAction<MetricUpdateData>) => {
        state.loading = false;
        state.waterLevelData = action.payload.data.waterLevel;
        state.batteryLevelData = action.payload.data.batteryLevel;
        state.signalStrengthData = action.payload.data.signalStrength;
        state.lastUpdateDate = action.payload.lastUpdateDate.toISOString();
      })
      .addCase(fetchInitialMetricUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching metric data';
      })  
      .addCase(fetchMetricUpdateBySensor.fulfilled, (state, action: PayloadAction<{data: MetricData, sensors: string[]}>) => {
        state.loading = false;
        state.waterLevelData = action.payload.data.waterLevel;
        state.batteryLevelData = action.payload.data.batteryLevel;
        state.signalStrengthData = action.payload.data.signalStrength;

      })
      .addCase(fetchMetricUpdateBySensor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching metric data';
      })
      .addCase(fetchMetricUpdateBySensor.pending, (state) => {
        state.loading = true;
      })
      ;
  },
});

export const { setData, setLastUpdateDate } = sensorMetricsSlice.actions;
export default sensorMetricsSlice.reducer;