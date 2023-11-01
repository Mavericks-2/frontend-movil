import { API_BASE_URL } from "../config";
import axios from "axios";

export const signup = async (user) => {
    const { email, password, name, lastName } = user
    const response = await axios.post(`${API_BASE_URL}/auth/signupAcomodador`, {
        email,
        password,
        name,
        lastName
    });

    return response.data.message;
}

export const verifyToken = async (user) => {
    const { email, verifyCode } = user;
    const response = await axios.post(`${API_BASE_URL}/auth/verifyAcomodador`, {
        email,
        verifyCode
    });

    return response.data.message;
}

export const signin = async (user) => {
    const { email, password } = user;
    const response = await axios.post(`${API_BASE_URL}/auth/signinAcomodador`, {
        email,
        password
    });

    return response.data;
}

export const getUser = async (user) => {
    const { email } = user;
    const response = await axios.post(`${API_BASE_URL}/auth/getUserAcomodador`, {
        email
    });

    return response.data.user;
}