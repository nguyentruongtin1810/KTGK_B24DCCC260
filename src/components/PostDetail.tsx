import { useNavigate, useParams } from "react-router-dom";
import { Post } from "../types";

interface Props {
    posts: Post[];
    onDelete: (id: number) => void;
}

function PostDetail({ posts, onDelete }: Props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const post = posts.find((p) => p.id === Number(id));

    if (!post) return <p>Không tìm thấy bài viết!</p>;

    const handleDelete = () => {
        if (window.confirm("Bạn có chắc muốn xóa bài viết này?")) {
            onDelete(post.id);
            navigate("/");
        }
    };

    return (
        <div className="post-detail">
            <h2>{post.title}</h2>
            <p><b>{post.author}</b> - {post.date}</p>
            <img src={post.thumbnail} alt={post.title} />
            <p><b>Thể loại:</b> {post.category}</p>
            <p className="content">{post.content}</p>
            <div className="detail-buttons">
                <button onClick={() => navigate(-1)}>Quay lại</button>
                <button onClick={() => navigate(`/posts/edit/${post.id}`)}>Chỉnh sửa</button>
                <button onClick={handleDelete}>Xóa bài viết</button>
            </div>
        </div>
    );
}

export default PostDetail;
