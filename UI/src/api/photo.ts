import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface PhotoDTO {
    id: string;
    imageData: string;
    createdAt: string;
    albumId: string;
    userId: string;
}

export const getPhotosByAlbum = async (albumId?: string): Promise<PhotoDTO[]> => {
    if (!albumId) {
        console.warn("⚠️ getPhotosByAlbum: albumId jest undefined, zwracam pustą tablicę.");
        return [];
    }

    const token = localStorage.getItem("jwt");
    const response = await axios.get(`${API_BASE_URL}/photos?albumId=${albumId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
export const uploadPhoto = async (albumId: string, file: File): Promise<PhotoDTO> => {
    const token = localStorage.getItem("jwt");

    const toBase64 = (file: File) =>
        new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });

    const fileBase64 = await toBase64(file);

    const payload = {
        albumId,
        fileName: file.name,
        fileData: fileBase64,
    };

    console.log("📤 Wysyłamy JSON:", payload);

    const response = await axios.post(`${API_BASE_URL}/photos`, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    });

    return response.data;
};


export const deletePhoto = async (photoId: string): Promise<void> => {
    const token = localStorage.getItem("jwt");
    await axios.delete(`${API_BASE_URL}/photos/${photoId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
export const getPhotosByUser = async (): Promise<PhotoDTO[]> => {
    const token = localStorage.getItem('jwt');
    const response = await axios.get(`${API_BASE_URL}/photos/user`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};
