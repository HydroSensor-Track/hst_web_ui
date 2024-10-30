import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import sensorTimeReducer from './sensorTimeSlice';
import queryChartReducer from './querySlice';
import sensorsInfoReducer from './sensorInfoSlice';
import ticketReducer from './ticketSlice';
import assigneeReducer from "./assigneeSlice";
import usersReducer from './usersSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    sensorTime: sensorTimeReducer,
    queryChart: queryChartReducer,
    sensorsInfo: sensorsInfoReducer,
    ticket: ticketReducer,
    assignee: assigneeReducer,
    users: usersReducer,
});

export default rootReducer;