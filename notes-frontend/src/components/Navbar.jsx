import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Note Manager</h2>
      <ul className="nav-links">
        <li><Link to="/">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/upload">Upload</Link></li>
        <li><Link to="/browse">Browse</Link></li>
        <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
