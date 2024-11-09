import axios, { AxiosError } from "axios";

import { CreateUserParams, UpdateUserParams } from "../interfaces/redux";
const ENDPOINT = "https://hst-web-server-53dq.onrender.com/users";
// TODO: change undefined with throw new Error

export const getUsers = async () => {
    try {
        const response = await axios.get(ENDPOINT);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
            console.error("Error response for getUsers", err.response);
            throw new Error("Failed to get users");
        }
        console.error("Error getUsers", err.message);
        throw new Error("Failed to get users");
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
        const err = error as AxiosError;
        if (err.response) {
            console.error("Error response for getUserById", err.response);
            throw new Error("Failed to get the user");
        }
        console.error("Error getUserById", err.message);
        throw new Error("Failed to get the user");
    }
};

export const createUser = async (user: CreateUserParams) => {
    try {
        const response = await axios.post(ENDPOINT, user);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
            console.error("Error response for createUser", err.response);
            throw new Error("Failed user create");
        }
        console.error("Error createUser", err.message);
        throw new Error("Failed user create");
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
        const err = error as AxiosError;
        if (err.response) {
            console.error("Error response for updateUser", err.response);
            throw new Error("Failed user update");
        }
        console.error("Error updateUser", err.message);
        throw new Error("Failed user update");
    }
};

export const deleteUser = async (id: string) => {
    try {
        const response = await axios.delete(`${ENDPOINT}/${id}`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
            console.error("Error response for deleteUser", err.response);
            throw new Error("Failed user delete");
        }
        console.error("Error deleteUser", err.message);
        throw new Error("Failed user delete");
    }
};