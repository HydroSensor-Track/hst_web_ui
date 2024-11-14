
// export const validateQuery = (query) => {
//     // Aquí puedes agregar validaciones, como verificar que las fechas no estén vacías
//     return query.timestampInicio && query.timestampFinal && query.sensores.length > 0;
//   };


import { QueryChart } from "../interfaces/queryChart";
import { DeltaBatteryLevelPoint, DeltaWaterLevelPoint, NetworkBatteryLevelData, NetworkWaterLevelData, PrevenirWaterLevelPoint } from "../interfaces/sensorInfo";

const RED_INICIAL = "delta-parana"

type NetworkKey = "delta-parana" | "prevenir";
const GAP_BY_NETWORK: Record<NetworkKey, number> = {
    "delta-parana": 60 * 60 * 1000,
    "prevenir": 5 * 60 * 1000
};

export const generateInitialState = () => {


    const query: QueryChart = {
        red: RED_INICIAL,
        ubicacion: "",
        sensores: [],
        unidadTiempo: "minute",
        actualizacionTiempo: "last_24_hours",
        timestampInicio: "",
        timestampFin: ""
    }
    return query;
}

export function isMetricDeltaInfo(datapoint: DeltaWaterLevelPoint | PrevenirWaterLevelPoint): datapoint is DeltaWaterLevelPoint {
    return (datapoint as DeltaWaterLevelPoint).hora !== undefined;
}



export const filterWaterData = (data: NetworkWaterLevelData, query: QueryChart) => {

    const { red, sensores, timestampInicio, timestampFin } = query;

    const filteredData = data[red]

    const datasets = []
    const labels: string[] = []
    const dataPoints: (number | null)[] = []
    const timestampInicioDate = new Date(timestampInicio)
    const timestampFinDate = new Date(timestampFin)
    const maxGapInMilliseconds = GAP_BY_NETWORK[red]


    if (sensores.length > 1) {
        return null;
    }


    const sensorId = sensores[0]


    if (!sensorId || (sensorId && !filteredData[sensorId])) {
        return null;
    }

    let nextTimestamp: Date | null = null;

    filteredData[sensorId].forEach((datapoint: DeltaWaterLevelPoint | PrevenirWaterLevelPoint) => {
        
        const timestampStr = isMetricDeltaInfo(datapoint) ? datapoint.hora : datapoint.time;
        const timestamp = new Date(timestampStr)
        
        if (timestamp >= timestampInicioDate && timestamp <= timestampFinDate) {

            if (nextTimestamp) {
                let gap = nextTimestamp.getTime() - timestamp.getTime();
                
                // Fill in missing timestamps in increments of maxGapInMilliseconds
                while (gap > maxGapInMilliseconds) {
                    nextTimestamp = new Date(nextTimestamp.getTime() + maxGapInMilliseconds);
                    labels.push(nextTimestamp.toISOString());
                    dataPoints.push(null); // Insert a null to indicate missing data

                    gap = gap - maxGapInMilliseconds
                }
            }

            nextTimestamp = timestamp
            labels.push(timestamp.toISOString());
            dataPoints.push(datapoint.nivel);
        }
    });

    datasets.push({
        label: `Sensor ${sensorId}`,
        data: dataPoints,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
    });

    return { labels, datasets };

}

export const filterBatteryData = (data: NetworkBatteryLevelData, query: QueryChart) => {
    const { red, sensores, timestampInicio, timestampFin } = query;

    const filteredData = data[red]

    const datasets = []
    const labels: string[] = []
    const dataPoints: (number | null)[] = []
    const timestampInicioDate = new Date(timestampInicio)
    const timestampFinDate = new Date(timestampFin)
    const maxGapInMilliseconds = GAP_BY_NETWORK[red]


    if (sensores.length > 1) {
        return null;
    }


    const sensorId = sensores[0]


    if (!sensorId || (sensorId && !filteredData[sensorId])) {
        return null;
    }

    let nextTimestamp: Date | null = null;

    filteredData[sensorId].forEach((datapoint: DeltaBatteryLevelPoint) => {
        
        const timestampStr = datapoint.hora;
        const timestamp = new Date(timestampStr)
        
        if (timestamp >= timestampInicioDate && timestamp <= timestampFinDate) {

            if (nextTimestamp) {
                let gap = nextTimestamp.getTime() - timestamp.getTime();
                
                // Fill in missing timestamps in increments of maxGapInMilliseconds
                while (gap > maxGapInMilliseconds) {
                    nextTimestamp = new Date(nextTimestamp.getTime() + maxGapInMilliseconds);
                    labels.push(nextTimestamp.toISOString());
                    dataPoints.push(null); // Insert a null to indicate missing data
                    gap = gap - maxGapInMilliseconds
                }
            }

            nextTimestamp = timestamp
            labels.push(timestamp.toISOString());
            dataPoints.push(datapoint.bateria);
        }
    });

    datasets.push({
        label: `Sensor ${sensorId}`,
        data: dataPoints,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
    });


    return { labels, datasets };

}