import { useState } from "react";
import { Post } from "../types";
import PostCard from "./PostCard";


interface Props {
    posts: Post[];
    onDelete: (id: number) => void;
}



function PostList({ posts, onDelete }: Props) {
    const [filter, setFilter] = useState("");

    const filteredPosts = posts.filter((p) =>
        p.title.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="post-list">
            <div className="post-header">
                <h2>Danh sách bài viết ({filteredPosts.length})</h2>
               
            </div>

            <input
                type="text"
                placeholder="Tìm theo tiêu đề..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="filter-input"
            />

            <div className="post-grid">
                {filteredPosts.map((post) => (
                    <PostCard key={post.id} post={post} onDelete={onDelete} />
                ))}
            </div>
            
        </div>
        
    );
}

export default PostList;
