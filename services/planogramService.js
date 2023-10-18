import { API_BASE_URL } from "../config";
import axios from "axios";

// Path: planogram/getPlanogramConfig
export const getPlanogramConfig = async () => {
    const id_acomodador = "990e8400-e29b-41d4-a716-446655440000";
    const res = await axios.get(`${API_BASE_URL}/planogram/getPlanogramConfig/${id_acomodador}`, {
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => {
        return res.data.planogram;
    });
    return res;
}