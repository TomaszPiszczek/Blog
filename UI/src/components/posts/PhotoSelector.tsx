import React, { useEffect, useState } from "react";
import { getPhotosByUser, PhotoDTO } from "../../api/photo";
import "../../styles/posts/PhotoSelector.css";

interface PhotoSelectorProps {
    onSelect: (photo: PhotoDTO) => void;
    onClose: () => void;
}

const PhotoSelector: React.FC<PhotoSelectorProps> = ({ onSelect, onClose }) => {
    const [photos, setPhotos] = useState<PhotoDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchPhotos = async () => {
        setLoading(true);
        try {
            const data = await getPhotosByUser();
            setPhotos(data);
        } catch (error) {
            console.error("Error fetching photos:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPhotos();
    }, []);

    return (
        <div className="photo-selector-overlay">
            <div className="photo-selector-modal">
                <button className="close-selector-button" onClick={onClose}>Close</button>
                <h2>Select a Photo</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="photo-selector-grid">
                        {photos.map((photo) => (
                            <img
                                key={photo.id}
                                src={`data:image/jpeg;base64,${photo.imageData}`}
                                alt="User Photo"
                                onClick={() => onSelect(photo)}
                                className="photo-thumbnail"
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PhotoSelector;
