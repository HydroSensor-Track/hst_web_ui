import { SensorInfo } from './sensorInfo';
import { SensorsTimeInfo } from './sensorTimeMetrics';
import { LocationSensor } from './locationSensor';
import { Ticket } from './tickets';
import { Assignee } from './assignee';
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

export interface LocationSensorState {
    ubicaciones: LocationSensor[];
    loading: boolean;
    error: string | null;
}
export interface TicketState {
    tickets: Ticket[];
    loading: boolean;
    error: string | null;
}

export interface AssigneeState {
    assignees: Assignee[];
    loading: boolean;
    error: string | null;
}

export interface UserState {
    users: UserCompleteInfo[];
    user: Partial<UserCompleteInfo>;
    loading: boolean;
    error: string | null;
}

export interface UpdateUserParams {
    email?: string;
    username?: string;
    user_metadata?: {
        [key: string]: string;
    };
    password?: string;
    verify_email?: boolean;
}

export type CreateUserParams = CommonUserInfo & UserPassword;
