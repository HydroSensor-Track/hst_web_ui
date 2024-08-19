import axios from 'axios';

const ENDPOINT = 'http://localhost:9290/sensors';

export const getSensorTimeSeries = async (metric: string, sensorName: string, from: number, to: number) => {
    try {
        const response = await axios.get(`${ENDPOINT}/${metric}?name=${sensorName}&from=${from}&to=${to}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error response for getSensorTimeSeries", error.response);
            return undefined;
        }
        console.error("Error getSensorTimeSeries", error.mesaage);
        return undefined;
    }
}

export const getSensorMetrics = async () => {
    try {
        const response = await axios.get(`${ENDPOINT}/metrics`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error response for getSensorMetrics", error.response);
        }
        console.error("Error getSensorMetrics", error.mesaage);
        return undefined;
    }
}