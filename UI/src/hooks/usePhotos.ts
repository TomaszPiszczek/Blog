import { useState, useEffect } from "react";

const usePhotos = () => {
    const [photos, setPhotos] = useState<any[]>([]);
    useEffect(() => {
    }, []);
    return { photos, setPhotos };
};

export default usePhotos;
