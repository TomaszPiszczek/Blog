import React, { useEffect, useState } from "react";
import "../../styles/posts/CommentSection.css";
import { CommentDTO, addComment, getCommentsByPost } from "../../api/comment";

interface CommentSectionProps {
    postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
    const [comments, setComments] = useState<CommentDTO[]>([]);
    const [newComment, setNewComment] = useState("");

    const fetchComments = async () => {
        const data = await getCommentsByPost(postId);
        setComments(data);
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    const handleAddComment = async () => {
        if (newComment.trim()) {
            await addComment({ postId, username: "", content: newComment });
            setNewComment("");
            fetchComments();
        }
    };

    return (
        <div className="comment-section">
            <div className="comment-list">
                {comments.map((comment, index) => (
                    <div className="comment" key={index}>
                        <span className="comment-username">{comment.username}</span>
                        <span className="comment-content">{comment.content}</span>
                    </div>
                ))}
            </div>
            <div className="comment-form">
                <input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment"
                />
                <button onClick={handleAddComment}>Add Comment</button>
            </div>
        </div>
    );
};

export default CommentSection;
