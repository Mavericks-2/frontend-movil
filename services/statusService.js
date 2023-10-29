import { API_BASE_URL } from "../config";
import axios from "axios";

export const postComparedPhotos = async (state, differencesMatrix, idAcomodador, idPlanograma) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/status/postComparedPhotos`, {
      estado: state,
      matrizDiferencias: differencesMatrix,
      id_acomodador: idAcomodador,
      id_planogram: idPlanograma,
    });

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};




export async function getIntentosPrevAcomodo() {
  const response = await fetch(`${API_BASE_URL}/status/getIntentosPrevAcomodo`, {
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