import axios from 'axios';

const ENDPOINT = 'http://localhost:9290/sensors';


export const getSensorsLocations = async () => {
    axios.get(`${ENDPOINT}/locations`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            if (error.response) {
                console.error("Error response for getSensorsLocations", error.response);
            }
            console.error("Error getSensorsLocations", error.mesaage);
        });
}