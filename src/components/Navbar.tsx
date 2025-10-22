import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css"; 

function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div className="nav-logo" onClick={() => navigate("/")}>
                 Quản lí bài viết 
            </div>
            <div className="nav-links">
                <NavLink to="/" className="nav-item">
                    Trang chủ
                </NavLink>
                <button className="nav-btn" onClick={() => navigate("/create")}>
                    Viết bài mới
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
