import axios from 'axios';

const ENDPOINT = 'http://localhost:9290/sensors';

export const getSensorTimeSeries = async (metric: string, sensorName: string, from: number, to: number) => {
    axios.get(`${ENDPOINT}/${metric}?name=${sensorName}&from=${from}&to=${to}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            if (error.response) {
                console.error("Error response for getSensorTimeSeries", error.response);
            }
            console.error("Error getSensorTimeSeries", error.mesaage);
        });
}

export const getSensorMetrics = async () => {
    axios.get(`${ENDPOINT}/metrics`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            if (error.response) {
                console.error("Error response for getSensorMetrics", error.response);
            }
            console.error("Error getSensorMetrics", error.mesaage);
        });
}