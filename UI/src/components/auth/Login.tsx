import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/auth";
import { successToast, errorToast } from "../../api/notifications";

export const Login: React.FC<{ toggleForm: () => void }> = ({ toggleForm }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = await loginUser({ email, password });
            successToast("Login successful!");
            localStorage.setItem("jwt", token);
            navigate("/home");
        } catch (err: any) {
            errorToast(err?.message || "Login error!");
        }
    };

    return (
        <div className="form-content">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <span onClick={toggleForm}>Signup now</span>
            </p>
        </div>
    );
};
