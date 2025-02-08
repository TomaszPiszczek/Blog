import React, { useState } from "react";
import { deletePost } from "../../api/post";
import "../../styles/posts/PostCard.css";
import { PostDTO } from "../../api/post";
import CommentSection from "./CommentSection";
import PhotoSelector from "./PhotoSelector";

interface PostCardProps {
    post: PostDTO;
    onPostUpdated: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onPostUpdated }) => {
    const [showComments, setShowComments] = useState(false);
    const [showPhotoSelector, setShowPhotoSelector] = useState(false);

    const handleDelete = async () => {
        await deletePost(post.uuid);
        onPostUpdated();
    };

    const handleAttachPhoto = () => {
        setShowPhotoSelector(true);
    };

    return (
        <div className="post-card">
            <div className="post-header">
                <span className="post-username">{post.username}</span>
                <span className="post-date">{new Date(post.createdAt).toLocaleString()}</span>
            </div>
            <div className="post-content">{post.content}</div>
            {post.photoData && (
                <img
                    className="post-image"
                    src={`data:image/jpeg;base64,${post.photoData}`}
                    alt="Post"
                />
            )}

            <div className="post-actions">
                <button onClick={() => setShowComments(!showComments)}>
                    {showComments ? "Hide Comments" : "Show Comments"}
                </button>
                <button onClick={handleDelete}>Delete Post</button>
            </div>
            {showComments && <CommentSection postId={post.uuid} />}
            {showPhotoSelector && (
                <PhotoSelector
                    onSelect={(photo) => {
                        setShowPhotoSelector(false);
                        onPostUpdated();
                    }}
                    onClose={() => setShowPhotoSelector(false)}
                />
            )}
        </div>
    );
};

export default PostCard;
