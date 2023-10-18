import { MODEL_BASE_URL } from "../config";
import axios from "axios";

export const classifyImage = async () => {
  const res = await axios
    .post(`${MODEL_BASE_URL}/classifyImage`, {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        coordenadas: {
          coordenadas: [
            {
              x: 0,
              y: 0,
              width: 125,
              height: 83.33333333333333,
            },
            {
              x: 125,
              y: 0,
              width: 125,
              height: 83.33333333333333,
            },
            {
              x: 250,
              y: 0,
              width: 125,
              height: 83.33333333333333,
            },
            {
              x: 375,
              y: 0,
              width: 125,
              height: 83.33333333333333,
            },
            {
              x: 0,
              y: 83.33333333333333,
              width: 125,
              height: 83.33333333333333,
            },
            {
              x: 125,
              y: 83.33333333333333,
              width: 125,
              height: 83.33333333333333,
            },
            {
              x: 250,
              y: 83.33333333333333,
              width: 125,
              height: 83.33333333333333,
            },
            {
              x: 375,
              y: 83.33333333333333,
              width: 125,
              height: 83.33333333333333,
            },
            {
              x: 0,
              y: 166.66666666666666,
              width: 100,
              height: 83.33333333333334,
            },
            {
              x: 100,
              y: 166.66666666666666,
              width: 100,
              height: 83.33333333333334,
            },
            {
              x: 200,
              y: 166.66666666666666,
              width: 100,
              height: 83.33333333333334,
            },
            {
              x: 300,
              y: 166.66666666666666,
              width: 100,
              height: 83.33333333333334,
            },
            {
              x: 400,
              y: 166.66666666666666,
              width: 100,
              height: 83.33333333333334,
            },
          ],
        },
      },
    })
    .then((res) => {
      return res.data;
    });

  return res;
};

export const compareImages = async (planogram, actualPlanogram) => {
  const res = await axios.post(`${MODEL_BASE_URL}/compareImages`, {
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
