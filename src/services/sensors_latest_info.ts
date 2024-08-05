import axios from 'axios';

const ENDPOINT = 'http://localhost:9290/sensors/latest';

export const getLatestInfoByName = async (locationName: string) => {
    try {
        const response = await axios.get(`${ENDPOINT}/${locationName}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error response for getLatestInfoByName", error.response);
            return undefined;
        }
        console.error("Error getLatestInfoByName", error.mesaage);
        return undefined;
    }
}

export const getLatestInfoByNameAndId = async (locationName: string, id: number) => {
    try {
        const response = await axios.get(`${ENDPOINT}/${locationName}${id}`);
        return response.data;
    }
    catch (error) {
        if (error.response) {
            console.error("Error response for getLatestInfoByNameAndId", error.response);
            return undefined;
        }
        console.error("Error getLatestInfoByNameAndId", error.mesaage);
        return undefined;
    }
}