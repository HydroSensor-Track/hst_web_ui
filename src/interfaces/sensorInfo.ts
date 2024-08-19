export interface SensorInfo {
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