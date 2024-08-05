import axios from 'axios';

const ENDPOINT = 'http://localhost:9290/sensors';


export const getSensorsLocations = async () => {
    try {
        const response = await axios.get(`${ENDPOINT}/locations`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error response for getSensorsLocations", error.response);
            return undefined;
        }
        console.error("Error getSensorsLocations", error.mesaage);
        return undefined;
    }
}