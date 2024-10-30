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

export type SensorList = (SensorDeltaInfo | SensorPrevenirInfo)[];

export interface LocationData {
    [locationName: string]: SensorList;
}

export interface NetworkData {
    [networkName: string]: LocationData;
}
