import React from "react";
import "../../styles/albums/AlbumActions.css";

interface AlbumActionsProps {
    mode: "default" | "create" | "delete";
    newAlbumName: string;
    onChangeNewAlbumName: (name: string) => void;
    onSetMode: (mode: "default" | "create" | "delete") => void;
    onConfirm: () => void;
}

const AlbumActions: React.FC<AlbumActionsProps> = ({
                                                       mode,
                                                       newAlbumName,
                                                       onChangeNewAlbumName,
                                                       onSetMode,
                                                       onConfirm,
                                                   }) => {
    return (
        <div className="album-actions">
            {mode === "default" && (
                <>
                    <button onClick={() => onSetMode("create")}>Create Album</button>
                    <button onClick={() => onSetMode("delete")}>Delete Album</button>
                </>
            )}
            {(mode === "create" || mode === "delete") && (
                <>
                    {mode === "create" && (
                        <input
                            type="text"
                            placeholder="Enter album name"
                            value={newAlbumName}
                            onChange={(e) => onChangeNewAlbumName(e.target.value)}
                        />
                    )}
                    <button onClick={onConfirm}>Confirm</button>
                    <button onClick={() => onSetMode("default")}>Cancel</button>
                </>
            )}
        </div>
    );
};

export default AlbumActions;
