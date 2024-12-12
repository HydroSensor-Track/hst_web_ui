import axios from "axios";

import { CreateUserParams, UpdateUserParams } from "../interfaces/redux";
const ENDPOINT = import.meta.env.VITE_ENDPOINT_URL + "/users";

export const getUsers = async () => {
    try {
        const response = await axios.get(ENDPOINT);
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch users');
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
        console.log(error)
        throw new Error('Failed to fetch user by ID');
    }
};

export const createUser = async (user: CreateUserParams) => {
    try {
        const response = await axios.post(ENDPOINT, user);
        return response.data;
    }  catch (error) {
        console.log(error)
        throw new Error('Failed to create user');
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
        console.log(error)
        throw new Error('Failed to update user');
    }
};

export const deleteUser = async (id: string) => {
    try {
        const response = await axios.delete(`${ENDPOINT}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error('Failed to delete user');
    }
};
