import { EXPO_PUBLIC_API_BASE_URL } from "../config";
import axios from "axios";

export const postComparedPhotos = async (state, differencesMatrix, productMatrix, idAcomodador, idPlanograma) => {
  try {
    const res = await axios.post(`${EXPO_PUBLIC_API_BASE_URL}/status/postComparedPhotos`, {
      estado: state,
      matrizDiferencias: differencesMatrix,
      matrizProductosF: productMatrix,
      id_acomodador: idAcomodador,
      id_planogram: idPlanograma,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};




export async function getIntentosPrevAcomodo() {
  const response = await fetch(`${EXPO_PUBLIC_API_BASE_URL}/status/getIntentosPrevAcomodo`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 200) {
    const data = await response.json();
    return data.intentosPrevAcomodo;
  } else {
    throw new Error("Error getting intentosPrevAcomodo");
  }
}