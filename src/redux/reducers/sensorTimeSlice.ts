import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { SensorTimeMetricsState, TimeMetricsParams } from '../../interfaces/redux';
import { SensorTimeInfo } from '../../interfaces/sensorTimeMetrics';
import { getSensorTimeSeries } from '../../services/sensors_metrics';

// TODO: Use the endpoint to get the sensor time metrics
const BATTERY = 'BATTERY_LEVEL';
const LEVEL = 'WATER_LEVEL';
const SIGNAL = 'SIGNAL_STRENGTH';

const INITIAL_STATE: SensorTimeMetricsState = {
    levelData: {},
    signalData: {},
    batteryData: {},
    loading: false,
    error: null
};

function getLocationName(data: SensorTimeInfo) {
    return Object.values(data)?.[0]?.[0]?.name ?? '';
}

export const getSensorLevelMetrics = createAsyncThunk<any, TimeMetricsParams>(
    'sensorTimeMetrics/getSensorLevelMetrics',
    async ({ sensorName, from, to }) => {
        const response = await getSensorTimeSeries(`${LEVEL}`, sensorName, from, to);

        return response as SensorTimeInfo;
    }
);

export const getSensorSignalMetrics = createAsyncThunk<any, TimeMetricsParams>(
    'sensorTimeMetrics/getSensorSignalMetrics',
    async ({ sensorName, from, to }) => {
        const response = await getSensorTimeSeries(`${SIGNAL}`, sensorName, from, to);

        return response as SensorTimeInfo;
    }
);

export const getSensorBatteryMetrics = createAsyncThunk<any, TimeMetricsParams>(
    'sensorTimeMetrics/getSensorBatteryMetrics',
    async ({ sensorName, from, to }) => {
        const response = await getSensorTimeSeries(`${BATTERY}`, sensorName, from, to);

        return response as SensorTimeInfo;
    }
);

const sensorTimeSlice = createSlice({
    name: 'sensorTimeMetrics',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getSensorLevelMetrics.pending, state => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getSensorLevelMetrics.fulfilled, (state, action) => {
            state.loading = false;

            const locationName = getLocationName(action.payload);

            if (locationName) {
                state.levelData[locationName] = action.payload;
            }

            //state.levelData[locationName] = action.payload;
            /*const index = state.levelData.findIndex(sensor => sensor.name === action.payload.name);

            if (index !== -1) {
                state.levelData[index] = action.payload;
            } else {
                state.levelData = action.payload;
            }*/
        });
        builder.addCase(getSensorLevelMetrics.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Error fetching level data';
        });

        builder.addCase(getSensorSignalMetrics.pending, state => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getSensorSignalMetrics.fulfilled, (state, action) => {
            state.loading = false;

            const locationName = getLocationName(action.payload);

            if (locationName) {
                state.signalData[locationName] = action.payload;
            }

            //state.signalData[locationName] = action.payload;
            /*const index = state.signalData.findIndex(sensor => sensor.name === action.payload.name);

            if (index !== -1) {
                state.signalData[index] = action.payload;
            } else {
                state.signalData.push(action.payload);
            }*/
        });
        builder.addCase(getSensorSignalMetrics.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Error fetching signal data';
        });

        builder.addCase(getSensorBatteryMetrics.pending, state => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getSensorBatteryMetrics.fulfilled, (state, action) => {
            state.loading = false;

            const locationName = getLocationName(action.payload);

            if (locationName) {
                state.batteryData[locationName] = action.payload;
            }

            //state.batteryData[locationName] = action.payload;
            /*const index = state.batteryData.findIndex(sensor => sensor.name === action.payload.name);

            if (index !== -1) {
                state.batteryData[index] = action.payload;
            } else {
                state.batteryData.push(action.payload);
            }*/
        });
        builder.addCase(getSensorBatteryMetrics.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Error fetching battery data';
        });
    }
});

export default sensorTimeSlice.reducer;