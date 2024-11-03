import { create } from "zustand";

export const useUrlDocumentSearchStore = create((set) => ({
    searchQuery: "",
    interest: "",
    language: "",
    setState: (newState: object) => set({...newState}),
    resetState: () => set({  
        searchQuery: "",
        interest: "",
        language: ""
    })
}));