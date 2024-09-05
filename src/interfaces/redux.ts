import { SensorInfo } from './sensorInfo';
import { SensorsTimeInfo } from './sensorTimeMetrics';
import { Ticket } from './tickets';
import { Assignee } from './assignee';

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