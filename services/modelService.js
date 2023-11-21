/**
 * @fileOverview Servicios de evaluación con el modelo de aprendizaje automático.
 *
 * @requires ../config
 * @requires axios
 *
 * @exports classifyImage
 * @exports compareImages
 * @exports uploadImage
 * @exports getImageSize
 * 
 */

import { EXPO_PUBLIC_MODEL_BASE_URL } from "../config";
import axios from "axios";


/**
 * 
 * Llamada a la API para clasificar una imagen.
 * 
 * @param {Array} rectangles Rectángulos de la imagen.
 * @returns {Array} Clasificación de la imagen.
 * 
*/

export const classifyImage = async (rectangles) => {
  const res = await axios
    .post(`${EXPO_PUBLIC_MODEL_BASE_URL}/classifyImage`, {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        coordenadas: {
          coordenadas: rectangles,
        },
      },
    })
    .then((res) => {
      return res.data;
    });

  return res;
};

/**
 * 
 * Llamada a la API para comparar dos matrices de clasificación de imágenes.
 * 
 * @param {Array} planogram Clasificación de la imagen de referencia.
 * @param {Array} actualPlanogram Clasificación de la imagen a comparar.
 * @returns {Array} Matriz de comparación de las dos imágenes.
 * 
*/

export const compareImages = async (planogram, actualPlanogram) => {
  const res = await axios.post(`${EXPO_PUBLIC_MODEL_BASE_URL}/compareImages`, {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      planogram: {
        "coordenadas": planogram,
      },
      actualPlanogram: {
        "coordenadas": actualPlanogram,
      },
    },
  }).then((res) => {
    return res.data.resultMatrix;
  });

  return res;
}

/**
 * 
 * Llamada a la API para subir una imagen.
 * 
 * @param {string} base64Image Imagen en base64.
 * @returns {string} Mensaje de éxito o error.
 * 
*/

export const uploadImage = async (base64Image) => {
  const res = await axios
    .post(`${EXPO_PUBLIC_MODEL_BASE_URL}/uploadImage`, {
      headers: {
        "Content-Type": "application/json",
      },
      imagen: base64Image,
      transpose: true
    })
    .then((res) => {
      return res.data;
    });
  
  return res.message;
}


/**
 * 
 * Llamada a la API para obtener el tamaño de una imagen.
 * 
 * @returns {object} Tamaño de la imagen.
 * 
*/

export const getImageSize = async () => {
  const res = await axios
    .get(`${EXPO_PUBLIC_MODEL_BASE_URL}/getImageSize`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    });

  return res;
}