/**
 * @fileOverview Servicios de planograma.
 * 
 * @requires ../config
 * @requires axios
 * 
 * @exports getPlanogramConfig
 *
 */

import { EXPO_PUBLIC_API_BASE_URL } from "../config";
import axios from "axios";


/**
 * 
 * Llamada a la API para obtener la configuración del planograma.
 * 
 * @param {object} userData Información del usuario.
 * @returns {object} Configuración del planograma.
 * 
*/

export const getPlanogramConfig = async (userData) => {
    const { id_acomodador } = userData;
    const res = await axios.get(`${EXPO_PUBLIC_API_BASE_URL}/planogram/getPlanogramConfig/${id_acomodador}`, {
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => {
        return res.data.planogram;
    });
    return res;
}