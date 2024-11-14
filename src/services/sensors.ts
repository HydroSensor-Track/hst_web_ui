import axios from 'axios';

const URL = import.meta.env.VITE_ENDPOINT_URL;

const ENDPOINTS = {
    "delta-parana": {
        "locations": "sensors/locations",
        "sensor-latest": "sensors/latest/${location}",
        "sensor-metric-location": "sensors/${metric_type}?name=${location}&from=${from}&to=${to}",
        "sensor-metric-all": "sensors/${metric_type}?from=${from}&to=${to}"
    },
    "prevenir": {
        "locations": null,
        "sensor-latest": "sensors/latest?sensor=${location}",
        "sensor-metric-location": "sensors/${metric_type}?sensor=${location}&from=${from}&to=${to}",
        "sensor-metric-all": "sensors/${metric_type}?&from=${from}&to=${to}"
    }
}

export const getMetricType = async () => {
    try {

        const url = `${URL}/delta-parana/sensors/metrics`
        const response = await axios.get(url);
        return response.data;

    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch metric types');
    }
}


export const getDeltaLocations = async () => {
    try {

        const endpoint = ENDPOINTS["delta-parana"]["locations"]

        const url = `${URL}/delta-parana/${endpoint}`
        const response = await axios.get(url);
        return response.data;

    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch sensors');
    }
}

export const getPrevenirLocations = async () => {
    try {

        const url = `${URL}/prevenir/sensors`

        const response = await axios.get(url);
        return response.data;

    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch sensors');
    }
}


export const getLocations = async (red: "prevenir" | "delta-parana") => {

    try {

        const endpoint = ENDPOINTS[red]["locations"]

        const url = `${URL}/${red}/${endpoint}`
        const response = await axios.get(url);
        return response.data;

    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch sensors');
    }
}

export const getSensors = async (red: "prevenir" | "delta-parana") => {
    try {

        const url = `${URL}/${red}/sensors`

        const response = await axios.get(url);
        return response.data;

    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch sensors');
    }
}

export const getSensorLatest = async (red: "prevenir" | "delta-parana", location: string) => {
    
    try {

        const endpoint = ENDPOINTS[red]["sensor-latest"].replace("${location}", location)
        const url = `${URL}/${red}/${endpoint}`


        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch sensors');
    }

}

// export const getSensorMetricCustomDates = async (red: "prevenir" | "delta-parana", metric_type: string, location: string, from: string, to: string) => {
//     try {

//         const endpoint = ENDPOINTS[red]["sensor-metric"].replace("${location}", location).replace("${metric_type}", metric_type).replace("${from}", from).replace("${to}", to)
//         const url = `${URL}/${red}/${endpoint}` 

//         const response = await axios.get(url);
//         return response;
//     } catch (error) {
//         console.log(error)
//         throw new Error('Failed to fetch sensors');
//     }
// }

export const getAllLocationsMetric = async (red: "prevenir" | "delta-parana", metric_type: string, from: Date, to: Date) => {
    try {

        const to_string = Math.floor(to.getTime() / 1000).toString();
        const from_string = Math.floor(from.getTime() / 1000).toString();

        const endpoint = ENDPOINTS[red]["sensor-metric-all"].replace("${metric_type}", metric_type).replace("${from}", from_string).replace("${to}", to_string)
        const url = `${URL}/${red}/${endpoint}` 

        const response = await axios.get(url);
        return response.data;

    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch sensors');
    }
}

export const getLocationMetric = async (red: "prevenir" | "delta-parana", metric_type: string, from: Date, to: Date, ubicacion: string) => {
    try {

        const to_string = Math.floor(to.getTime() / 1000).toString();
        const from_string = Math.floor(from.getTime() / 1000).toString();

        const endpoint = ENDPOINTS[red]["sensor-metric-location"].replace("${location}", ubicacion).replace("${metric_type}", metric_type).replace("${from}", from_string).replace("${to}", to_string)
        const url = `${URL}/${red}/${endpoint}` 

        const response = await axios.get(url);
        return response.data;

    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch sensors');
    }
}