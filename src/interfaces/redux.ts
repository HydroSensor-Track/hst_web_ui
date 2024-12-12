import { Ticket } from './tickets';
import { Assignee } from './assignee';
import { UserCompleteInfo, CommonUserInfo, UserPassword } from './userInfo';
import { NetworkBatteryLevelData, NetworkData, NetworkSignalStrengthData, NetworkWaterLevelData } from './sensorInfo';

export interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
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
    current_user: Partial<UserCompleteInfo>;
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

export interface SensorsInfoState {
    byLocation: NetworkData;
    loading: boolean;
    error: string | null;
  }

export interface SensorsMetricsState {
    waterLevelData: NetworkWaterLevelData,
    batteryLevelData: NetworkBatteryLevelData,
    signalStrengthData: NetworkSignalStrengthData,
    lastUpdateDate: string | null,
    loading: boolean;
    error: string | null;
  }