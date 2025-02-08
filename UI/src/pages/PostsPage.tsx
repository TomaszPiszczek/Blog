import React, { useEffect, useState } from "react";
import PostForm from "../components/posts/PostFrom";
import PostList from "../components/posts/PostList";
import { getAllPosts } from "../api/post";
import "../styles/posts/PostsPage.css";

const PostsPage: React.FC = () => {
    const [posts, setPosts] = useState([]);
    const fetchPosts = async () => {
        const data = await getAllPosts();
        setPosts(data);
    };
    useEffect(() => {
        fetchPosts();
    }, []);
    return (
        <div className="posts-page">
            <h1>Posts</h1>
            <PostForm onPostCreated={fetchPosts} />
            <PostList posts={posts} onPostUpdated={fetchPosts} />
        </div>
    );
};

export default PostsPage;
