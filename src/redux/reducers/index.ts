import { combineReducers } from "@reduxjs/toolkit";
import queryChartReducer from './querySlice';
import sensorsInfoReducer from './sensorInfoSlice';
import ticketReducer from './ticketSlice';
import assigneeReducer from "./assigneeSlice";
import usersReducer from './usersSlice';
import sensorsMetricsReducer from './sensorMetricsSlice';

const rootReducer = combineReducers({
    queryChart: queryChartReducer,
    sensorsInfo: sensorsInfoReducer,
    ticket: ticketReducer,
    assignee: assigneeReducer,
    users: usersReducer,
    sensorsMetrics: sensorsMetricsReducer
});

export default rootReducer;