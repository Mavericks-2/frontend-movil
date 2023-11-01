import { API_BASE_URL } from "../config";
import axios from "axios";

// Path: planogram/getPlanogramConfig
export const getPlanogramConfig = async (userData) => {
    const { id_acomodador } = userData;
    const res = await axios.get(`${API_BASE_URL}/planogram/getPlanogramConfig/${id_acomodador}`, {
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => {
        return res.data.planogram;
    });
    return res;
}