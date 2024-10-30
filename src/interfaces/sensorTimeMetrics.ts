interface CommonSensorTimeMetrics {
    name: string;
    hora: string;
}

interface SensorTimeBatteryMetrics {
    bateria: number;
}

interface SensorTimeLevelMetrics {
    nivel: number;
}

interface SensorTimeSignalMetrics {
    senal: number;
}

export type SensorTimeMetrics = CommonSensorTimeMetrics & (
    SensorTimeBatteryMetrics |
    SensorTimeLevelMetrics |
    SensorTimeSignalMetrics
);

export interface SensorTimeInfo {
    [id: string]: SensorTimeMetrics[];
}

export interface SensorsTimeInfo {
    [name: string]: SensorTimeInfo;
}

export function isBatteryMetric(metric: SensorTimeMetrics): metric is SensorTimeBatteryMetrics & CommonSensorTimeMetrics {
    return (metric as SensorTimeBatteryMetrics).bateria !== undefined;
}

export function isLevelMetric(metric: SensorTimeMetrics): metric is SensorTimeLevelMetrics & CommonSensorTimeMetrics {
    return (metric as SensorTimeLevelMetrics).nivel !== undefined;
}

export function isSignalMetric(metric: SensorTimeMetrics): metric is SensorTimeSignalMetrics & CommonSensorTimeMetrics {
    return (metric as SensorTimeSignalMetrics).senal !== undefined;
}