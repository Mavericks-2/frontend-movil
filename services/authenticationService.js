/**
 * @fileOverview Servicios de autenticación.
 *
 * @requires ../config
 * 
 * @exports signup
 * @exports signin
 * @exports verifyToken
 * @exports getUser
 * 
 */

import { EXPO_PUBLIC_API_BASE_URL } from "../config";
import axios from "axios";

/**
 * 
 * Llamada a la API para registrar un usuario.
 * 
 * @param {object} user Información del usuario a registrar.
 * @returns {string} Mensaje de éxito o error.
*/

export const signup = async (user) => {
    const { email, password, name, lastName } = user
    const response = await axios.post(`${EXPO_PUBLIC_API_BASE_URL}/auth/signupAcomodador`, {
        email,
        password,
        name,
        lastName
    });

    return response.data.message;
}

/**
 * 
 * Llamada a la API para verificar el código de verificación.
 * 
 * @param {object} user Información del usuario a registrar.
 * @returns {string} Mensaje de éxito o error.
*/

export const verifyToken = async (user) => {
    const { email, verifyCode } = user;
    const response = await axios.post(`${EXPO_PUBLIC_API_BASE_URL}/auth/verifyAcomodador`, {
        email,
        verifyCode
    });

    return response.data.message;
}

/**
 * 
 * Llamada a la API para iniciar sesión.
 * 
 * @param {object} user Información del usuario a registrar.
 * @returns {string} Token de sesión.
*/

export const signin = async (user) => {
    const { email, password } = user;
    const response = await axios.post(`${EXPO_PUBLIC_API_BASE_URL}/auth/signinAcomodador`, {
        email,
        password
    });

    return response.data;
}

/**
 * 
 * Llamada a la API para obtener información del usuario.
 * 
 * @param {object} user Información del usuario a buscar.
 * @returns {object} Información del usuario.
*/

export const getUser = async (user) => {
    const { email } = user;
    const response = await axios.post(`${EXPO_PUBLIC_API_BASE_URL}/auth/getUserAcomodador`, {
        email
    });

    return response.data.user;
}