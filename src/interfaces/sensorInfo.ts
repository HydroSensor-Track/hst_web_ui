export interface SensorDeltaInfo {
    id: string;
    marca: string;
    modelo: string;
    serie: string;
    nivel: number;
    bateria: number;
    senal: number;
    hora: string;
    latitud: number | null;
    longitud: number | null;
    name: string;
}

export interface SensorPrevenirInfo {
    id: string;
    name: string;
    nivel: number;
    hora: string;
}

export interface LocationData {
    [locationName: string]: SensorList;
}

export type SensorList = (SensorDeltaInfo | SensorPrevenirInfo)[];

export type Network = "delta-parana" | "prevenir"

export type NetworkData = {
    [key in Network]: LocationData;
}

export enum NETWORK {
    DELTA_PARANA = "delta-parana",
    PREVENIR = "prevenir"
}

export enum METRIC_TYPE {
    WATER_LEVEL = "WATER_LEVEL",
    BATTERY_LEVEL = "BATTERY_LEVEL",
    SIGNAL_STRENGTH = "SIGNAL_STRENGTH"
}

export interface PrevenirWaterLevelPoint {
    time: string, nivel: number;
}

export interface DeltaWaterLevelPoint {
    name: string, hora: string, nivel: number;
}

export interface DeltaBatteryLevelPoint {
    name: string, hora: string, bateria: number;
}

export interface DeltaSignalStrengthPoint {
    name: string, hora: string, senal: number;
}

export type SensorWaterLevel = {[sensorId: string]: (PrevenirWaterLevelPoint | DeltaWaterLevelPoint)[]};
export type SensorBattery = {[sensorId: string]: (DeltaBatteryLevelPoint)[]};
export type SensorSignal = {[sensorId: string]: (DeltaSignalStrengthPoint)[]}; 

export type DeltaMetric = DeltaWaterLevelPoint | DeltaBatteryLevelPoint | DeltaSignalStrengthPoint;
export type PrevenirMetric = PrevenirWaterLevelPoint;

export interface NetworkWaterLevelData {
    [networkName: string]: SensorWaterLevel;
}

export interface NetworkBatteryLevelData {
    [networkName: string]: SensorBattery;
}

export interface NetworkSignalStrengthData {
    [networkName: string]: SensorSignal;
}

export interface MetricData {
    waterLevel: NetworkWaterLevelData;
    batteryLevel: NetworkBatteryLevelData;
    signalStrength: NetworkSignalStrengthData;
}

export interface MetricUpdateData {
    lastUpdateDate: Date,
    data: MetricData
}