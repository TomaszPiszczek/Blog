import React, { useState, useEffect, useRef } from "react";
import "../../styles/albums/AlbumPhotos.css";
import { PhotoDTO, getPhotosByAlbum, uploadPhoto, deletePhoto } from "../../api/photo";
import { successToast, errorToast } from "../../api/notifications";

interface AlbumPhotosProps {
    albumId: string;
    albumName: string;
    onClose: () => void;
}

const AlbumPhotos: React.FC<AlbumPhotosProps> = ({ albumId, albumName, onClose }) => {
    const [photos, setPhotos] = useState<PhotoDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const fetchPhotos = async () => {
        setLoading(true);
        try {
            const photosData = await getPhotosByAlbum(albumId);
            setPhotos(photosData);
        } catch (error) {
            errorToast("Błąd pobierania zdjęć.");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPhotos();
    }, [albumId]);

    const handleAddPhotoClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                await uploadPhoto(albumId, file);
                successToast("Sucessfuly uploaded photo");
                fetchPhotos();
            } catch (error) {
                errorToast("Error");
            }
        }
    };

    const handleDeletePhoto = async (photoId: string) => {
        try {
            await deletePhoto(photoId);
            successToast("Photo deleted");
            fetchPhotos();
        } catch (error) {
            errorToast("Error deleting.");
        }
    };

    return (
        <div className="album-photos-overlay">
            <div className="album-photos-container">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>{albumName}</h2>
                <div className="actions">
                    <button className="add-photo-button" onClick={handleAddPhotoClick}>
                        Add photo
                    </button>
                    <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
                </div>
                {loading ? (
                    <p>Ładowanie zdjęć...</p>
                ) : (
                    <div className="photos-grid">
                        {photos.length > 0 ? (
                            photos.map(photo => (
                                <div key={photo.id} className="photo-card">
                                    <img src={`data:image/jpeg;base64,${photo.imageData}`} alt="Photo" className="photo-image" />
                                    <button className="delete-photo-button" onClick={() => handleDeletePhoto(photo.id)}>Delete</button>
                                </div>
                            ))
                        ) : (
                            <p>Brak zdjęć w albumie.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AlbumPhotos;
