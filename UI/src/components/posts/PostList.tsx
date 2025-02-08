import React from "react";
import PostCard from "./PostCard";
import "../../styles/posts/PostList.css";
import { PostDTO } from "../../api/post";

interface PostListProps {
    posts: PostDTO[];
    onPostUpdated: () => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onPostUpdated }) => {
    return (
        <div className="post-list">
            {posts.map((post) => (
                <PostCard key={post.uuid} post={post} onPostUpdated={onPostUpdated} />
            ))}
        </div>
    );
};

export default PostList;
