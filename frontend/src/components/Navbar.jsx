import { Link, useNavigate } from 'react-router-dom';

function Navbar({ token, setToken }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/');
  };

  if (!token) return null;

  return (
    <nav className="nav">
      <div>
        <div>
          <Link to="/dashboard" className="link">Dashboard</Link>
          <Link to="/students/list" className="link">Students</Link>
          <Link to="/teachers/list" className="link">Teachers</Link>
          <Link to="/classes/list" className="link">Classes</Link>
          <Link to="/facilities/list" className="link">Facilities</Link>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="logout-btn"
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar; 