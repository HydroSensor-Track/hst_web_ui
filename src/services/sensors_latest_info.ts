import axios, { AxiosError } from 'axios';

const ENDPOINT = 'https://hst-web-server-53dq.onrender.com/delta-parana/sensors/latest';

export const getLatestInfoByName = async (locationName: string) => {
    try {
        const response = await axios.get(`${ENDPOINT}/${locationName}`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
            console.error("Error response for getLatestInfoByName", err.response);
            return undefined;
        }
        console.error("Error getLatestInfoByName", err.message);
        return undefined;
    }
}

export const getLatestInfoByNameAndId = async (locationName: string, id: number) => {
    try {
        const response = await axios.get(`${ENDPOINT}/${locationName}${id}`);
        return response.data;
    }
    catch (error) {
        const err = error as AxiosError;
        if (err.response) {
            console.error("Error response for getLatestInfoByNameAndId", err.response);
            return undefined;
        }
        console.error("Error getLatestInfoByNameAndId", err.message);
        return undefined;
    }
}