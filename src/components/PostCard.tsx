import { Link } from "react-router-dom";
import { Post } from "../types";

interface Props {
    post: Post;
    onDelete: (id: number) => void;
}

function PostCard({ post, onDelete }: Props) {
    const handleDelete = () => {
        if (window.confirm("Bạn có chắc muốn xóa bài viết này?")) {
            onDelete(post.id);
        }
    };

    return (
        <div className="post-card">
            <img src={post.thumbnail} alt={post.title} />
            <h3>{post.title}</h3>
            <p className="post-meta">
                <b>{post.author}</b> - {post.date}
            </p>
            <p>{post.content.slice(0, 100)}...</p>
            <div className="post-actions">
                <Link to={`/posts/${post.id}`}>Đọc thêm</Link>
                <button onClick={handleDelete}>Xóa</button>
            </div>
        </div>
    );
}

export default PostCard;
