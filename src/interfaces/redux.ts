import { SensorInfo } from './sensorInfo';
import { SensorsTimeInfo } from './sensorTimeMetrics';
import { UserCompleteInfo, CommonUserInfo, UserPassword } from './userInfo';

export interface AuthState {
    isAuthenticated: boolean;
}

export interface SensorState {
    sensors: SensorInfo[];
    locations: string[];
    loading: boolean;
    error: string | null;
}

export interface SensorTimeMetricsState {
    levelData: SensorsTimeInfo;
    signalData: SensorsTimeInfo;
    batteryData: SensorsTimeInfo;
    loading: boolean;
    error: string | null;
}

export interface TimeMetricsParams {
    sensorName: string;
    from: number;
    to: number;
}

export interface UserState {
    users: UserCompleteInfo[];
    user: UserCompleteInfo | {};
    loading: boolean;
    error: string | null;
}

export interface UpdateUserParams {
    email?: string;
    userName?: string;
    userMetadata?: {
        [key: string]: string;
    };
    password?: string;
}

export type CreateUserParams = CommonUserInfo & UserPassword;