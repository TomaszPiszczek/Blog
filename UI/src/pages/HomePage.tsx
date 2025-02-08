import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("jwt");

    const goToAlbums = () => {
        navigate("/albums");
    };

    const goToPosts = () => {
        if (token) {
            navigate("/posts");
        }
    };

    return (
        <div className="home-container">
            <div className="button-section" onClick={goToAlbums}>
                <img src="https://img.icons8.com/fluency/96/000000/camera.png" alt="Albums Icon" className="icon" />
                <h2>Albums & Photos</h2>
            </div>
            <div className={`button-section ${token ? "" : "disabled"}`} onClick={goToPosts}>
                <img src="https://img.icons8.com/fluency/96/000000/news.png" alt="Posts Icon" className="icon" />
                <h2>{token ? "Posts" : "Log in to get access"}</h2>
            </div>
        </div>
    );
};

export default HomePage;
