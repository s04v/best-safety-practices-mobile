import { create } from "zustand";

export const useDocumentStore = create((set) => ({
    selectedDocument: {},
    setState: (newState: object) => set({...newState}),
    resetState: () => set({  
        selectedDocument: {},
    })
}));