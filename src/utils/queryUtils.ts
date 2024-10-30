
// export const validateQuery = (query) => {
//     // Aquí puedes agregar validaciones, como verificar que las fechas no estén vacías
//     return query.timestampInicio && query.timestampFinal && query.sensores.length > 0;
//   };


import { QueryChart } from "../interfaces/queryChart";

const RED_INICIAL = "delta-parana"

export const generateInitialState = () => {

    const query: QueryChart = {
        red: RED_INICIAL,
        ubicacion: "",
        sensores: [],
        unidadTiempo: "minute",
        actualizacionTiempo: "last_6_hours",
        timestampInicio: "2023-09-01T00:00:00",
        timestampFin: "2023-09-01T23:59:00"
    }
    return query;
}
  