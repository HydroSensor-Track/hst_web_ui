import { combineReducers } from "@reduxjs/toolkit";
import queryChartReducer from './querySlice';
import sensorsInfoReducer from './sensorInfoSlice';
import ticketReducer from './ticketSlice';
import usersReducer from './usersSlice';
import sensorsMetricsReducer from './sensorMetricsSlice';
import reportsReducer from './reportsSlice';

const rootReducer = combineReducers({
    queryChart: queryChartReducer,
    sensorsInfo: sensorsInfoReducer,
    ticket: ticketReducer,
    users: usersReducer,
    sensorsMetrics: sensorsMetricsReducer,
    reports: reportsReducer
});

export default rootReducer;