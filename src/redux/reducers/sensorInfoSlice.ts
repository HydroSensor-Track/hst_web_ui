import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { NetworkData, LocationData, SensorDeltaInfo, SensorPrevenirInfo } from '../../interfaces/sensorInfo';
import { getDeltaLocations, getPrevenirLocations, getSensorLatest } from '../../services/sensors_location';
import { sortNetworksByLocation } from '../../utils/functions';


interface SensorsInfoState {
  byLocation: NetworkData;
  loading: boolean;
  error: string | null;
}

const initialState: SensorsInfoState = {
  byLocation: {"delta-parana": {}, "prevenir": {}},
  loading: false,
  error: null,
};

export const fetchSensorsInfo = createAsyncThunk(
  'locations/fetchSensorsInfo',
  async () => {
    const sensorsDelta: string[] = await getDeltaLocations();
    const sensorsPrevenir: string[] = await getPrevenirLocations();

    const byLocationDelta: LocationData = {};
    const byLocationPrevenir: LocationData = {};

    await Promise.all(
      sensorsDelta.map(async (location) => {
        const sensorLatestInfo = await getSensorLatest("delta-parana", location);
        
        if (sensorLatestInfo) {
          sensorLatestInfo.forEach((sensorDelta: SensorDeltaInfo) => {
            const sensor = {
              ...sensorDelta,
              "id": String(sensorDelta.id)
            }
            if (!byLocationDelta[location]) {
              byLocationDelta[location] = [];
            }
            byLocationDelta[location].push(sensor);
          });
        }
      })
    );

    await Promise.all(sensorsPrevenir.map(async (location) => {
      const sensorLatestInfo = await getSensorLatest("prevenir", location)
      const sensor: SensorPrevenirInfo = {
        "id": sensorLatestInfo.sensor,
        "name": sensorLatestInfo.sensor,
        "nivel": sensorLatestInfo.nivel,
        "hora": sensorLatestInfo.time
      }
      if (!byLocationPrevenir[location]) {
        byLocationPrevenir[location] = [];
      }
      byLocationPrevenir[location].push(sensor);
    }));

    const sensorsByLocation: NetworkData = {"delta-parana": byLocationDelta, "prevenir": byLocationPrevenir}

    const orderedSensorsByLocation: NetworkData = sortNetworksByLocation(sensorsByLocation)

    const lastUpdate = new Date().toISOString();

    localStorage.setItem("networkMetadata", JSON.stringify({"last_update_date": lastUpdate, "data": orderedSensorsByLocation}))

    return orderedSensorsByLocation;
  }
);


const sensorInfoSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setByLocation: (state, action: PayloadAction<NetworkData>) => {
      state.byLocation = action.payload;
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSensorsInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSensorsInfo.fulfilled, (state, action: PayloadAction<NetworkData>) => {
        state.loading = false;
        state.byLocation = action.payload;
      })
      .addCase(fetchSensorsInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching sensors';
      });
  },
});

export const { setByLocation } = sensorInfoSlice.actions;
export default sensorInfoSlice.reducer;