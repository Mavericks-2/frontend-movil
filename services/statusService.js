import { EXPO_PUBLIC_API_BASE_URL } from "../config";
import axios from "axios";

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
