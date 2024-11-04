export interface DocumentPreviewItem {
    id: number,
    title: string,
    publisher: string,
    rating: number,
    interest: string,
    language: string,
    uploadDate: Date,
};

export interface UrlDocument {
    id: number,
    title: string,
    rating: number,
    interest: string,
    language: string,
    uploadDate: Date,
}

export interface News {
    id: number,
    description: string,
    photo: number,
    title: string,
    uploadDate: Date,
}