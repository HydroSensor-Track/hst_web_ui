import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
// import sensorReducer from './sensorSlice';
import sensorTimeReducer from './sensorTimeSlice';
import queryChartReducer from './querySlice';
import sensorsInfoReducer from './sensorInfoSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    // sensor: sensorReducer,
    sensorTime: sensorTimeReducer,
    queryChart: queryChartReducer,
    sensorsInfo: sensorsInfoReducer,
    // Add other reducers here
});

export default rootReducer;