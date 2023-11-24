/**
 * @fileOverview Servicios de las métricas de desempeño.
 * 
 * @requires ../config
 * @requires axios
 * 
 * @exports postComparedPhotos
 * @exports getIntentosPrevAcomodo
 * @exports getMostFailedProduct
 * @exports getNumberScanns
 * @exports getNumberScannsProducts
 * @exports getAccuracy 
 * 
 */

import { EXPO_PUBLIC_API_BASE_URL } from "../config";
import axios from "axios";

axios.defaults.timeout = 10000;

/**
 * 
 * Llamada a la API para enviar la comparación de dos imágenes.
 * 
 * @param {string} state Estado de la comparación.
 * @param {Array} differencesMatrix Matriz de diferencias.
 * @param {Array} productMatrix Matriz de productos.
 * @param {string} idAcomodador ID del acomodador.
 * @param {string} idPlanograma ID del planograma.
 * 
 * @returns {string} Mensaje de éxito o error.
 * 
*/

export const postComparedPhotos = async (
  state,
  differencesMatrix,
  productMatrix,
  idAcomodador,
  idPlanograma
) => {
  try {
    const res = await axios.post(
      `${EXPO_PUBLIC_API_BASE_URL}/status/postComparedPhotos`,
      {
        estado: state,
        matrizDiferencias: differencesMatrix,
        matrizProductosF: productMatrix,
        id_acomodador: idAcomodador,
        id_planogram: idPlanograma,
      }
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 
 * Llamada a la API para obtener el número de intentos de acomodo previos.
 * 
 * @returns {number} Número de intentos de acomodo previos.
 * 
*/

export async function getIntentosPrevAcomodo() {
  const response = await fetch(
    `${EXPO_PUBLIC_API_BASE_URL}/status/getIntentosPrevAcomodo`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status === 200) {
    const data = await response.json();
    return data.intentosPrevAcomodo;
  } else {
    throw new Error("Error getting intentosPrevAcomodo");
  }
}

/**
 * 
 * Llamada a la API para obtener el producto que más se ha fallado.
 * 
 * @param {string} idAcomodador ID del acomodador.
 * 
 * @returns {string} Producto que más se ha fallado.
 * 
*/

export async function getMostFailedProduct(idAcomodador) {
  try {
    const response = await fetch(
      `${EXPO_PUBLIC_API_BASE_URL}/status/getMostFailedProduct/${idAcomodador}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data.product;
  } catch (error) {
    throw new Error("Error getting mostFailedProduct");
  }
}

/**
 * 
 * Llamada a la API para obtener el número de escaneos.
 * 
 * @param {string} idAcomodador ID del acomodador.
 * 
 * @returns {number} Número de escaneos.
 * 
*/

export async function getNumberScanns(idAcomodador) {
  try {
    const response = await fetch(
      `${EXPO_PUBLIC_API_BASE_URL}/status/getNumberScanns/${idAcomodador}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return data.numberScanns;
  } catch (error) {
    throw new Error("Error getting numberScanns");
  }
}

/**
 * 
 * Llamada a la API para obtener el número de escaneos de productos.
 * 
 * @param {string} idAcomodador ID del acomodador.
 * 
 * @returns {number} Número de escaneos de productos.
 * 
*/

export async function getNumberScannsProducts(idAcomodador) {
  try {
    const response = await fetch(
      `${EXPO_PUBLIC_API_BASE_URL}/status/getNumberScannsProducts/${idAcomodador}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return data.numberScannsProducts;
  } catch (error) {
    throw new Error("Error getting numberScannsProducts");
  }
}

/**
 * 
 * Llamada a la API para obtener el porcentaje de precisión.
 * 
 * @param {string} idAcomodador ID del acomodador.
 * 
 * @returns {number} Porcentaje de precisión.
 * 
*/

export async function getAccuracy(idAcomodador) {
  try {
    const response = await fetch(
      `${EXPO_PUBLIC_API_BASE_URL}/status/getAccuracy/${idAcomodador}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return data.accuracy;
  } catch (error) {
    throw new Error("Error getting accuracy");
  }
}
