import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import sensorReducer from './sensorSlice';
import sensorTimeReducer from './sensorTimeSlice';
import ticketReducer from './ticketSlice';
import assigneeReducer from "./assigneeSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    sensor: sensorReducer,
    sensorTime: sensorTimeReducer,
    ticket: ticketReducer,
    assignee: assigneeReducer,
    // Add other reducers here
});

export default rootReducer;