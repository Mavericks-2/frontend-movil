import { EXPO_PUBLIC_MODEL_BASE_URL } from "../config";
import axios from "axios";

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