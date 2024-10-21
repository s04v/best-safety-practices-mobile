import { create } from "zustand";

export const useDocumentSearchStore = create((set) => ({
    searchQuery: "",
    publisher: "",
    interest: "",
    language: "",
    setState: (newState: object) => set({...newState}),
    resetState: () => set({  
        searchQuery: "",
        publisher: "",
        interest: "",
        language: ""
    })
}));