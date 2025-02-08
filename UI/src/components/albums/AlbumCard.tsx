import React from "react";
import "../../styles/albums/AlbumCard.css";

interface AlbumCardProps {
    album: { id: string; name: string; userName: string };
    selectable?: boolean;
    checked?: boolean;
    onSelect?: (id: string, selected: boolean) => void;
    onClick?: () => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({
                                                 album,
                                                 selectable = false,
                                                 checked = false,
                                                 onSelect,
                                                 onClick,
                                             }) => {
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        if (onSelect) {
            onSelect(album.id, e.target.checked);
        }
    };

    return (
        <div className="album-card" onClick={selectable ? undefined : onClick}>
            {selectable && (
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleCheckboxChange}
                    onClick={(e) => e.stopPropagation()}
                />
            )}
            <img
                src="https://img.icons8.com/fluency/48/000000/folder-invoices.png"
                alt="Folder Icon"
                className="folder-icon"
            />
            <h3>{album.name}</h3>
            <p>{album.userName}</p>
        </div>
    );
};

export default AlbumCard;
