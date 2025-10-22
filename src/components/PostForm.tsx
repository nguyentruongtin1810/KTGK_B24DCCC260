import { useState, useEffect } from "react";
import { Post } from "../types";
import { useNavigate } from "react-router-dom";

interface Props {
    onSave: (post: Post) => void;
    initialData?: Post;
}

function PostForm({ onSave, initialData }: Props) {
    const [form, setForm] = useState<Post>(
        initialData || {
            id: 0,
            title: "",
            author: "",
            thumbnail: "",
            content: "",
            category: "Khác",
            date: "",
        }
    );

    const navigate = useNavigate();

    useEffect(() => {
        if (initialData) setForm(initialData);
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        if (form.title.length < 10) return "Tiêu đề phải ít nhất 10 ký tự";
        if (form.author.length < 3) return "Tác giả phải ít nhất 3 ký tự";
        if (form.content.length < 50) return "Nội dung phải ít nhất 50 ký tự";
        return "";
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const error = validate();
        if (error) {
            alert(error);
            return;
        }
        const newPost = {
            ...form,
            id: form.id || Date.now(),
            date: form.date || new Date().toLocaleDateString(),
        };
        onSave(newPost);
        alert(initialData ? "Cập nhật thành công!" : "Đăng bài thành công!");
        navigate("/");
    };

    return (
        <form className="post-form" onSubmit={handleSubmit}>
            <h2>{initialData ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}</h2>
            <input name="title" placeholder="Tiêu đề" value={form.title} onChange={handleChange} />
            <input name="author" placeholder="Tác giả" value={form.author} onChange={handleChange} />
            <input name="thumbnail" placeholder="URL ảnh thumbnail" value={form.thumbnail} onChange={handleChange} />
            <select name="category" value={form.category} onChange={handleChange}>
                <option>Công nghệ</option>
                <option>Du lịch</option>
                <option>Ẩm thực</option>
                <option>Đời sống</option>
                <option>Khác</option>
            </select>
            <textarea
                name="content"
                placeholder="Nội dung bài viết (ít nhất 50 ký tự)"
                rows={10}
                value={form.content}
                onChange={handleChange}
            ></textarea>
            <div className="form-buttons">
                <button type="submit">{initialData ? "Cập nhật" : "Đăng bài"}</button>
                <button type="button" onClick={() => navigate("/")}>
                    Hủy
                </button>
            </div>
        </form>
    );
}

export default PostForm;
