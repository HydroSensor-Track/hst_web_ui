export interface QueryChart {
    red: string;
    ubicacion: string;
    sensores: string[];
    unidadTiempo: false | "minute" | "hour" | "day" | "year" | "month" | "millisecond" | "second" | "week" | "quarter" | undefined;
    actualizacionTiempo: string;
    timestampInicio: string;
    timestampFin: string;
}