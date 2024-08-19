import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { SensorState } from '../../interfaces/redux';
import { SensorInfo } from '../../interfaces/sensorInfo';
import { getLatestInfoByName } from '../../services/sensors_latest_info';
import { getSensorsLocations } from '../../services/sesnsors_location';

const INITIAL_STATE: SensorState = {
    sensors: [],
    locations: [],
    loading: false,
    error: null
};

export const sensorLatestInfo = createAsyncThunk<any, string>(
    'sensor/sensorLatestInfo',
    async (sensorName) => {
        const response = await getLatestInfoByName(sensorName);
        const data: SensorInfo[] = response;
        return data;
    }
);

export const sensorsLocation = createAsyncThunk<any, void>(
    'sensor/sensorsLocation',
    async () => {
        const response = await getSensorsLocations();
        return response;
    }
)

const sensorSlice = createSlice({
    name: 'sensor',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(sensorsLocation.fulfilled, (state, action) => {
            state.locations = action.payload;
        });
        builder.addCase(sensorsLocation.rejected, (state, action) => {
            state.error = action.error.message || 'Error fetching locations';
        });
        builder.addCase(sensorLatestInfo.pending, state => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(sensorLatestInfo.fulfilled, (state, action) => {
            state.loading = false;

            for (let i = 0; i < action.payload.length; i++) {
                const index = state.sensors.findIndex(sensor => sensor.id === action.payload[i].id);

                if (index !== -1) {
                    state.sensors[index] = action.payload[i];
                    continue;
                }

                state.sensors.push(action.payload[i]);
            }
        });
        builder.addCase(sensorLatestInfo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Error fetching sensors';
        });
    }
});

export default sensorSlice.reducer;