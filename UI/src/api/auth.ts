import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface RegisterPayload {
    username: string;
    email: string;
    password: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export const registerUser = async (payload: RegisterPayload): Promise<string> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, payload);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error.message;
    }
};

export const loginUser = async (payload: LoginPayload): Promise<string> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, payload);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error.message;
    }
};
