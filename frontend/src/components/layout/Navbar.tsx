import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="nav-link"> <div className="navbar-logo">PartsVision</div> </Link>
            <div className="navbar-links">
                <Link to="/" className="nav-link">Strona główna</Link>
                <Link to="/login" className="nav-link">Logowanie</Link>
                <Link to="/register" className="nav-btn">Zacznij teraz</Link>
            </div>
        </nav>
    );
}

