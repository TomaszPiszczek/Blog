import React, { useState } from "react";
import "../../styles/auth/AuthPage.css";
import { Login } from "../../components/auth/Login";
import { Register } from "../../components/auth/Register";

export const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className={`auth-container ${isLogin ? "login" : "register"}`}>
            <div className="image-container">
                <h2>
                    {isLogin
                        ? "Every new friend is a new adventure."
                        : "Join us and start your journey!"}
                </h2>
                <p>Let's get connected</p>
            </div>
            <div className="form-container">
                {isLogin ? <Login toggleForm={toggleForm} /> : <Register toggleForm={toggleForm} />}
            </div>
        </div>
    );
};
