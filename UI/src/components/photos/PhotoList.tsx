import React from "react";
import "../../styles/albums/AlbumList.css";
import AlbumCard from "../albums/AlbumCard.tsx"; // Upewnij się, że ten plik istnieje i zawiera właściwe style

interface Album {
    id: string;
    name: string;
    username: string;
}

interface AlbumListProps {
    albums: Album[];
    selectable: boolean;
    selectedAlbums: string[];
    onSelectAlbum: (id: string, selected: boolean) => void;
    onClickAlbum: (album: Album) => void;
}

const AlbumList: React.FC<AlbumListProps> = ({
                                                 albums,
                                                 selectable,
                                                 selectedAlbums,
                                                 onSelectAlbum,
                                                 onClickAlbum,
                                             }) => {
    return (
        <div className="album-list">
            {albums.map((album) => (
                <AlbumCard
                    key={album.id}
                    album={album}
                    selectable={selectable}
                    checked={selectedAlbums.includes(album.id)}
                    onSelect={onSelectAlbum}
                    onClick={() => {
                        if (!selectable) {
                            onClickAlbum(album);
                        }
                    }}
                />
            ))}
        </div>
    );
};

export default AlbumList;
