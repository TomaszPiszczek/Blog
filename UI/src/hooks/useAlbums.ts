import { useState, useEffect } from "react";
import { AlbumDTO, getAllAlbums } from "../api/album";

const useAlbums = () => {
    const [albums, setAlbums] = useState<AlbumDTO[]>([]);
    const fetchAlbums = async () => {
        try {
            const data = await getAllAlbums();
            setAlbums(data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchAlbums();
    }, []);
    return { albums, fetchAlbums, setAlbums };
};

export default useAlbums;
