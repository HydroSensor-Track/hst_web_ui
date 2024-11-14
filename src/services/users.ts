import axios from "axios";

import { CreateUserParams, UpdateUserParams } from "../interfaces/redux";
const ENDPOINT = import.meta.env.VITE_ENDPOINT_URL + "/users";

export const getUsers = async () => {
    try {
        const response = await axios.get(ENDPOINT);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error response for getUsers", error.response);
            return undefined;
        }
        console.error("Error getUsers", error.message);
        return undefined;
    }
};

export const getUserById = async (id: string | undefined) => {
    try {
        if (id === undefined) {
            return undefined;
        }

        const response = await axios.get(`${ENDPOINT}/${id}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error response for getUserById", error.response);
            return undefined;
        }
        console.error("Error getUserById", error.message);
        return undefined;
    }
};

export const createUser = async (user: CreateUserParams) => {
    try {
        const response = await axios.post(ENDPOINT, user);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error response for createUser", error.response);
            return undefined;
        }
        console.error("Error createUser", error.message);
        return undefined;
    }
};

export const updateUser = async (id: string | undefined, data: UpdateUserParams) => {
    try {
        if (id === undefined) {
            return undefined;
        }

        const response = await axios.patch(`${ENDPOINT}/${id}`, data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error response for updateUser", error.response);
            return undefined;
        }
        console.error("Error updateUser", error.message);
        return undefined;
    }
};

export const deleteUser = async (id: string) => {
    try {
        const response = await axios.delete(`${ENDPOINT}/${id}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error response for deleteUser", error.response);
            return undefined;
        }
        console.error("Error deleteUser", error.message);
        return undefined;
    }
};
