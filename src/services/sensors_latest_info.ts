import axios from 'axios';

const ENDPOINT = 'http://localhost:9290/sensors/latest';

export const getLatestInfoByName = async (locationName: string) => {
    axios.get(`${ENDPOINT}/${locationName}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            if (error.response) {
                console.error("Error response for getLatestInfoByName", error.response);
            }
            console.error("Error getLatestInfoByName", error.mesaage);
        });
}

export const getLatestInfoByNameAndId = async (locationName: string, id: number) => {
    axios.get(`${ENDPOINT}/${locationName}${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            if (error.response) {
                console.error("Error response for getLatestInfoByNameAndId", error.response);
            }
            console.error("Error getLatestInfoByNameAndId", error.mesaage);
        });
}