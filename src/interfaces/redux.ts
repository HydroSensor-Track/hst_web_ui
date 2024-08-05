import { SensorInfo } from './sensorInfo';

export interface AuthState {
    isAuthenticated: boolean;
}

export interface SensorState {
    sensors: SensorInfo[];
    locations: string[];
    loading: boolean;
    error: string | null;
}