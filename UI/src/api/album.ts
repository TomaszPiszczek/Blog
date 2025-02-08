import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface AlbumDTO {
    id: string;
    name: string;
    createdAt: string;
    userName: string;
}

export const getAllAlbums = async (): Promise<AlbumDTO[]> => {
    const token = localStorage.getItem("jwt");
    const response = await axios.get(`${API_BASE_URL}/albums`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const createAlbum = async (name: string): Promise<AlbumDTO> => {
    const token = localStorage.getItem("jwt");
    const response = await axios.post(
        `${API_BASE_URL}/albums`,
        JSON.stringify(name),
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    );
    console.log("JWT:", token);

    return response.data;
};

export const deleteAlbum = async (albumId: string): Promise<void> => {
    const token = localStorage.getItem("jwt");
    await axios.delete(`${API_BASE_URL}/albums/${albumId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
