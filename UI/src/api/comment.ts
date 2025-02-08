import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface CommentDTO {
    username: string;
    content: string;
    postId: string;
}

export const getCommentsByPost = async (postId: string): Promise<CommentDTO[]> => {
    const token = localStorage.getItem("jwt");
    const response = await axios.get(`${API_BASE_URL}/comments/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const addComment = async (comment: CommentDTO): Promise<CommentDTO> => {
    const token = localStorage.getItem("jwt");
    const response = await axios.post(`${API_BASE_URL}/comments`, comment, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    return response.data;
};

export const editComment = async (commentId: string, newContent: string): Promise<CommentDTO> => {
    const token = localStorage.getItem("jwt");
    const response = await axios.put(`${API_BASE_URL}/comments/${commentId}`, newContent, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    return response.data;
};

export const deleteComment = async (commentId: string): Promise<void> => {
    const token = localStorage.getItem("jwt");
    await axios.delete(`${API_BASE_URL}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
