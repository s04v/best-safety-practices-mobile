import { create } from "zustand";

export const useNewsStore = create((set) => ({
    selectedNews: {},
    setState: (newState: object) => set({...newState}),
    resetState: () => set({  
        selectedNews: {},
    })
}));