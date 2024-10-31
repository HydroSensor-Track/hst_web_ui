import axios, { AxiosError } from 'axios';

const ENDPOINT = 'https://hst-web-server-53dq.onrender.com/delta-parana/sensors';


export const getSensorsLocations = async () => {
    try {
        const response = await axios.get(`${ENDPOINT}/locations`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
            console.error("Error response for getSensorsLocations", err.response);
            return undefined;
        }
        console.error("Error getSensorsLocations", err.message);
        return undefined;
    }
}