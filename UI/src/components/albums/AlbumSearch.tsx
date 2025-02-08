import React, { useState } from "react";
import "../../styles/albums/AlbumSearch.css";

interface AlbumSearchProps {
    onSearch: (searchTerm: string) => void;
}

const AlbumSearch: React.FC<AlbumSearchProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
    };
    return (
        <input
            type="text"
            placeholder="Search by username"
            value={searchTerm}
            onChange={handleChange}
            className="album-search-input"
        />
    );
};

export default AlbumSearch;
