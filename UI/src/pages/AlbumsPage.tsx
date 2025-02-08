import React, { useState, useEffect } from "react";
import AlbumSearch from "../components/albums/AlbumSearch";
import AlbumActions from "../components/albums/AlbumActions";
import AlbumList from "../components/albums/AlbumList";
import AlbumPhotos from "../components/albums/AlbumPhotos";
import useAlbums from "../hooks/useAlbums";
import {
    createAlbum as apiCreateAlbum,
    deleteAlbum as apiDeleteAlbum,
    AlbumDTO,
} from "../api/album";
import "../styles/albums/AlbumPage.css";

type Mode = "default" | "create" | "delete";

const AlbumsPage: React.FC = () => {
    const { albums, fetchAlbums } = useAlbums();
    const [filteredAlbums, setFilteredAlbums] = useState<AlbumDTO[]>([]);
    const [mode, setMode] = useState<Mode>("default");
    const [newAlbumName, setNewAlbumName] = useState("");
    const [selectedAlbums, setSelectedAlbums] = useState<string[]>([]);
    const [selectedAlbumForPhotos, setSelectedAlbumForPhotos] = useState<AlbumDTO | null>(null);

    useEffect(() => {
        setFilteredAlbums(albums);
    }, [albums]);

    const handleSearch = (searchTerm: string) => {
        const filtered = albums.filter((album) =>
            album.userName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredAlbums(filtered);
    };

    const handleConfirm = async () => {
        if (mode === "create") {
            if (newAlbumName.trim() !== "") {
                try {
                    await apiCreateAlbum(newAlbumName);
                    await fetchAlbums();
                    setNewAlbumName("");
                    setMode("default");
                } catch (error) {
                    console.error(error);
                }
            }
        }
        if (mode === "delete") {
            try {
                for (const id of selectedAlbums) {
                    await apiDeleteAlbum(id);
                }
                await fetchAlbums();
                setSelectedAlbums([]);
                setMode("default");
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleSelectAlbum = (id: string, selected: boolean) => {
        if (selected) {
            setSelectedAlbums((prev) => [...prev, id]);
        } else {
            setSelectedAlbums((prev) => prev.filter((albumId) => albumId !== id));
        }
    };

    const handleClickAlbum = (album: AlbumDTO) => {
        setSelectedAlbumForPhotos(album);
    };

    return (
        <div className="albums-page">
            <AlbumSearch onSearch={handleSearch} />
            <div className="albums-container">
                <div className="albums-menu">
                    <AlbumActions
                        mode={mode}
                        newAlbumName={newAlbumName}
                        onChangeNewAlbumName={setNewAlbumName}
                        onSetMode={setMode}
                        onConfirm={handleConfirm}
                    />
                </div>
                <div className="albums-content">
                    <AlbumList
                        albums={filteredAlbums}
                        selectable={mode === "delete"}
                        selectedAlbums={selectedAlbums}
                        onSelectAlbum={handleSelectAlbum}
                        onClickAlbum={handleClickAlbum}
                    />
                </div>
            </div>
            {selectedAlbumForPhotos && (
                <AlbumPhotos
                    albumId={selectedAlbumForPhotos.id}
                    albumName={selectedAlbumForPhotos.name}
                    onClose={() => setSelectedAlbumForPhotos(null)}
                />
            )}


        </div>
    );
};

export default AlbumsPage;
