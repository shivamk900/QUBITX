import { create } from "zustand";
import axios from "axios";
const API_URL = "http://192.168.130.252:5000/api/";

export const useStore = create((set) => ({
    data: [],
    loading: false,
    error: null,
    schedulerDa: [],
    schedulerLoading: false,
    schedulerError: null,
    fetchSchedulerData: async () => {
        set({ schedulerLoading: true, schedulerError: null });
        try {
            const response = await axios.get(`${API_URL}scheduler`);
            set({ schedulerDa: response.data, schedulerLoading: false });
        } catch (error) {
            set({ schedulerLoading: false, schedulerError: error.message });
        }
    }
}));