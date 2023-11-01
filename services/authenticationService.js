import { API_BASE_URL } from "../config";
import axios from "axios";

export const signup = async (user) => {
    const { email, password, name, lastName } = user
    const response = await axios.post(`${API_BASE_URL}/signupAcomodador`, {
        email,
        password,
        name,
        lastName
    });

    return response.data;
}

export const verifyToken = async (user) => {
    const { email, token } = user;
    const response = await axios.post(`${API_BASE_URL}/verifyAcomodador`, {
        email,
        token
    });

    return response.data;
}

export const signin = async (user) => {
    const { email, password } = user;
    const response = await axios.post(`${API_BASE_URL}/signinAcomodador`, {
        email,
        password
    });

    return response.data;
}

export const getUser = async (user) => {
    const { email } = user;
    const response = await axios.post(`${API_BASE_URL}/getUserAcomodador`, {
        email
    });

    return response.data;
}