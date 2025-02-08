import React, { useState } from "react";
import { createPost } from "../../api/post";
import "../../styles/posts/PostForm.css";
import PhotoSelector from "./PhotoSelector";

interface PostFormProps {
    onPostCreated: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ onPostCreated }) => {
    const [content, setContent] = useState("");
    const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);
    const [showPhotoSelector, setShowPhotoSelector] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createPost(content, selectedPhotoId);
        setContent("");
        setSelectedPhotoId(null);
        onPostCreated();
    };

    return (
        <div className="post-form-container">
            <form className="post-form" onSubmit={handleSubmit}>
        <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter post content"
        />
                <div className="file-input-section">
                    <button type="button" onClick={() => setShowPhotoSelector(true)}>
                        Select Photo from Library
                    </button>
                </div>
                {selectedPhotoId && (
                    <div className="selected-photo-preview">
                        <img src={selectedPhotoId} alt="Selected" />
                    </div>
                )}
                <button type="submit">Create Post</button>
            </form>
            {showPhotoSelector && (
                <PhotoSelector
                    onSelect={(photo) => {
                        setSelectedPhotoId(photo.id);
                        setShowPhotoSelector(false);
                    }}
                    onClose={() => setShowPhotoSelector(false)}
                />
            )}
        </div>
    );
};

export default PostForm;
