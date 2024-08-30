import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import sensorReducer from './sensorSlice';
import sensorTimeReducer from './sensorTimeSlice';
import ticketReducer from './ticketSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    sensor: sensorReducer,
    sensorTime: sensorTimeReducer,
    ticket: ticketReducer
    // Add other reducers here
});

export default rootReducer;