import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface CommentDTO {
    username: string;
    content: string;
    postId: string;
}

export interface PostDTO {
    uuid: string;
    content: string;
    createdAt: string;
    photoData?: string;
    username: string;
    comments: CommentDTO[];
}

export const getAllPosts = async (): Promise<PostDTO[]> => {
    const token = localStorage.getItem("jwt");
    const response = await axios.get(`${API_BASE_URL}/posts`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const createPost = async (content: string, photoId: string | null): Promise<PostDTO> => {
    const token = localStorage.getItem("jwt");
    const payload = { content, photoId };
    const response = await axios.post(`${API_BASE_URL}/posts`, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    return response.data;
};

export const deletePost = async (postId: string): Promise<void> => {
    const token = localStorage.getItem("jwt");
    await axios.delete(`${API_BASE_URL}/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const addPhotoToPost = async (photoId: string, postId: string): Promise<PostDTO> => {
    const token = localStorage.getItem("jwt");
    const response = await axios.post(`${API_BASE_URL}/photos/${photoId}/post/${postId}`, null, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};
