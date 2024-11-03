import { create } from "zustand";

export const useUrlDocumentStore = create((set) => ({
    selectedUrlDocument: {},
    setState: (newState: object) => set({...newState}),
    resetState: () => set({  
        selectedUrlDocument: {},
    })
}));