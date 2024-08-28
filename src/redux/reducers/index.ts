import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import sensorReducer from './sensorSlice';
import sensorTimeReducer from './sensorTimeSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    sensor: sensorReducer,
    sensorTime: sensorTimeReducer
    // Add other reducers here
});

export default rootReducer;