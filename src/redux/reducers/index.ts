import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import sensorReducer from './sensorSlice';
import sensorTimeReducer from './sensorTimeSlice';
import usersReducer from './usersSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    sensor: sensorReducer,
    sensorTime: sensorTimeReducer,
    users: usersReducer,
    // Add other reducers here
});

export default rootReducer;