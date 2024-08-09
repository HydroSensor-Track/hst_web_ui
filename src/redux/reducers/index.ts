import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import sensorReducer from './sensorSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    sensor: sensorReducer,
    // Add other reducers here
});

export default rootReducer;