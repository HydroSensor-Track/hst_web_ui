export interface QueryChart {
    red: "delta-parana" | "prevenir";
    ubicacion: string;
    sensores: string[];
    unidadTiempo: "minute" | "hour" | "day"
    actualizacionTiempo: string;
    timestampInicio: string;
    timestampFin: string;
}