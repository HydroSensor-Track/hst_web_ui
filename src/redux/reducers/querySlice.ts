import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { generateInitialState } from '../../utils/queryUtils';
import { QueryChart } from '../../interfaces/queryChart';
import { fetchSensorsInfo } from './sensorInfoSlice';
import { NetworkData } from '../../interfaces/sensorInfo';


const initialState: QueryChart = generateInitialState()

const querySlice = createSlice({
    name: 'query',
    initialState,
    reducers: {
        setRed: (state, action: PayloadAction<"delta-parana" | "prevenir">) => {
            state.red = action.payload;
        },
        setUbicacion: (state, action: PayloadAction<string>) => {
            state.ubicacion = action.payload;
        },
        setSensores: (state, action: PayloadAction<string[]>) => {
            state.sensores = action.payload;
        },
        setUnidadTiempo: (state, action: PayloadAction<"minute" | "hour" | "day">) => {
            state.unidadTiempo = action.payload;
        },
        setActualizacionTiempo: (state, action: PayloadAction<string>) => {
            state.actualizacionTiempo = action.payload;
        },
        setTimestampInicio: (state, action: PayloadAction<string>) => {
            state.timestampInicio = action.payload;
        },
        setTimestampFin: (state, action: PayloadAction<string>) => {
            state.timestampFin = action.payload;
        },
        resetQuery: (state) => {
            state.ubicacion = initialState.ubicacion;
            state.sensores = initialState.sensores;
            state.unidadTiempo = initialState.unidadTiempo;
            state.actualizacionTiempo = initialState.actualizacionTiempo;
            state.timestampInicio = initialState.timestampInicio;
            state.timestampFin = initialState.timestampFin;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSensorsInfo.fulfilled, (state, action) => {

            const byNetwork: NetworkData = action.payload;
            const byLocation = byNetwork[initialState.red]
  
            const firstLocation = Object.keys(byLocation)[0]
            const firstSensors = byLocation[firstLocation];

            state.ubicacion = firstLocation;
            state.sensores = firstSensors.map(sensor => sensor.id);

        });
    }
});

// Exportar las acciones y el reducer
export const { setRed, setUbicacion, setSensores, setUnidadTiempo, setActualizacionTiempo, setTimestampInicio, setTimestampFin, resetQuery } = querySlice.actions;
export default querySlice.reducer;
