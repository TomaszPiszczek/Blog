import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth";
import { successToast, errorToast } from "../../api/notifications";

export const Register: React.FC<{ toggleForm: () => void }> = ({ toggleForm }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            errorToast("Passwords do not match!");
            return;
        }
        try {
            const token = await registerUser({ username, email, password });
            successToast("Registration successful!");
            localStorage.setItem("jwt", token);
            navigate("/home");
        } catch (err: any) {
            errorToast(err?.message || "Registration error!");
        }
    };

    return (
        <div className="form-content">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
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
                <input
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account? <span onClick={toggleForm}>Login now</span>
            </p>
        </div>
    );
};
