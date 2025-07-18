import { useNavigate, Link } from 'react-router-dom';
import './Dashboard.css'; // 👈 Import the new CSS

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="dashboard-wrapper">
      <h1>Welcome to Your Dashboard</h1>
      <p>Manage your notes:</p>

      <ul>
        <li>
          <Link to="/upload">📤 Upload a New Note</Link>
        </li>
        <li>
          <Link to="/browse">📂 Browse All Notes</Link>
        </li>
      </ul>

      <button onClick={handleLogout} className="logout-button">
        🚪 Logout
      </button>
    </div>
  );
};

export default Dashboard;
