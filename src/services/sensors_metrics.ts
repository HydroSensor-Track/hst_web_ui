import axios, { AxiosError } from 'axios';

const ENDPOINT = 'https://hst-web-server-53dq.onrender.com/delta-parana/sensors';

export const getSensorTimeSeries = async (metric: string, sensorName: string, from: number, to: number) => {
    try {
        const response = await axios.get(`${ENDPOINT}/${metric}?name=${sensorName}&from=${from}&to=${to}`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
            console.error("Error response for getSensorTimeSeries", err.response);
            return undefined;
        }
        console.error("Error getSensorTimeSeries", err.message);
        return undefined;
    }
}

export const getSensorMetrics = async () => {
    try {
        const response = await axios.get(`${ENDPOINT}/metrics`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
            console.error("Error response for getSensorMetrics", err.response);
        }
        console.error("Error getSensorMetrics", err.message);
        return undefined;
    }
}