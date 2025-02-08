import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthPage } from "./pages/auth/AuthPage";
import HomePage from "./pages/HomePage";
import "./styles/notifications/ToastStyles.css";
import { Toaster } from "react-hot-toast";
import AlbumsPage from "./pages/AlbumsPage.tsx";
import PostsPage from "./pages/PostsPage.tsx";

function App() {
    return (
        <Router>
            <Toaster />
            <Routes>
                <Route path="/" element={<AuthPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/albums" element={<AlbumsPage />} />
                <Route path="/posts" element={<PostsPage />} />
            </Routes>
        </Router>
    );
}

export default App;
