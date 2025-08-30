// src/components/Header.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <span className="header-brand">TrackInTrade</span>
        <div className="header-nav">
            <Link to="/dashboard" className="header-nav-link">Dashboard</Link>
            <Link to="/trades" className="header-nav-link">Trades</Link>
            <Link to="/notes" className="header-nav-link">Notes</Link>
            {user && <Link to="/insights" className="header-nav-link">AI Insights</Link>}
            <Link to="/goals" className="header-nav-link">Goals</Link>
        </div>
        <div className="header-user-section"> {/* NEW WRAPPER */}
          {user && user.name && <span className="welcome-message">Welcome, {user.name}</span>}
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </div>
    </header>
  );
};

export default Header;