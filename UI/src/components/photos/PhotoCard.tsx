import React, { useState } from "react";

interface AlbumActionsProps {
    onCreateAlbum: (albumName: string) => void;
    onDeleteAlbums: (albumIds: string[]) => void;
}

const AlbumActions: React.FC<AlbumActionsProps> = ({ onCreateAlbum, onDeleteAlbums }) => {
    const [mode, setMode] = useState<"default" | "create" | "delete">("default");
    const [albumName, setAlbumName] = useState("");
    const [selectedAlbums, setSelectedAlbums] = useState<string[]>([]);

    const handleCreateClick = () => {
        setMode("create");
    };

    const handleDeleteClick = () => {
        setMode("delete");
    };

    const handleConfirmClick = () => {
        if (mode === "create") {
            onCreateAlbum(albumName);
            setAlbumName("");
        } else if (mode === "delete") {
            onDeleteAlbums(selectedAlbums);
            console.log("deleted");
            setSelectedAlbums([]);
        }
        setMode("default");
    };

    return (
        <div className="album-actions">
            <button onClick={handleCreateClick}>Create Album</button>
            <button onClick={handleDeleteClick}>Delete Album</button>
            <button onClick={handleConfirmClick}>Confirm</button>
            {mode === "create" && (
                <div className="create-album">
                    <input
                        type="text"
                        placeholder="Enter album name"
                        value={albumName}
                        onChange={(e) => setAlbumName(e.target.value)}
                    />
                </div>
            )}
        </div>
    );
};

export default AlbumActions;
