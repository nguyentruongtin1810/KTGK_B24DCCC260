import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import PostForm from "./components/PostForm";
import { Post } from "./types";
import "./App.css";

function App() {
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, title: "Công nghệ AI đang thay đổi thế giới", author: "Tín Nguyễn", thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzJhpfHK39GMJ0JDIt2b0vWDpF0FUehO2ohA&s", content: "Trí tuệ nhân tạo đang là xu hương theo đuổi của nhiều bạn sinh viên hiện nay ", category: "Công nghệ", date: "20/10/2025" },
    { id: 2, title: "Khám phá ẩm thực đường phố Hà Nội", author: "Lều Ngân", thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5ffKuq9DTyRpBOg8ZGP01aszcSZcJ9fQXDw&s", content: "Phở là 1 món ăn truyền thống của người Việt Nam ", category: "Ẩm thực", date: "18/10/2025" },
    { id: 3, title: "Top 5 điểm du lịch miền Trung", author: "Nguyễn Tảo ", thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5UvavEHKuk6sSHTG-Wzxt9iRNKB2JWFn6EA&s", content: "Miền Trung có nhiều địa điểm du lịch hấp dẫn...", category: "Du lịch", date: "10/10/2025" },
    { id: 4, title: "Sống xanh trong thời hiện đại", author: "Vũ Thủy ", thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBb-i4vQibNAgPjWWc9J74fb1t3NlHaad2vQ&s", content: "Lối sống xanh không chỉ tốt cho môi trường...", category: "Đời sống", date: "05/10/2025" },
    { id: 5, title: "Món ngon cuối tuần: bún chả", author: "Nguyễn Tuyết ", thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4FLvnGIXP9QJZTJ02Mo8DCTw8g5XDcenjlA&s", content: "Bún chả là món ăn truyền thống được yêu thích...", category: "Ẩm thực", date: "03/10/2025" },
    { id: 6, title: "Học React dễ hay khó?", author: "Lại Nguyên", thumbnail: "https://wp-cms-media.s3.ap-east-1.amazonaws.com/react_la_gi_2_c508734e12.jpg", content: "React là thư viện giúp xây dựng giao diện hiệu quả...", category: "Công nghệ", date: "01/10/2025" },
  ]);

  const addOrUpdatePost = (post: Post) => {
    setPosts((prev) => {
      const exists = prev.find((p) => p.id === post.id);
      if (exists) return prev.map((p) => (p.id === post.id ? post : p));
      return [...prev, post];
    });
  };

  const deletePost = (id: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<PostList posts={posts} onDelete={deletePost} />} />
          <Route path="/create" element={<PostForm onSave={addOrUpdatePost} />} />
          <Route path="/posts/:id" element={<PostDetail posts={posts} onDelete={deletePost} />} />
          <Route path="/posts/edit/:id" element={<EditWrapper posts={posts} onSave={addOrUpdatePost} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function EditWrapper({ posts, onSave }: { posts: Post[]; onSave: (p: Post) => void }) {
  const { id } = useParams();
  const post = posts.find((p) => p.id === Number(id));
  return <PostForm onSave={onSave} initialData={post} />;
}

export default App;
