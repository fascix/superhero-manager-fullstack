import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          🦸 SuperHero Manager
        </Link>
        
        <div className="navbar-links">
          <Link to="/dashboard" className="nav-link">
            📊 Tableau de bord
          </Link>
          
          {user && (user.role === 'admin' || user.role === 'editor') && (
            <Link to="/add-hero" className="nav-link">
              ➕ Ajouter un héros
            </Link>
          )}
          
          {user && user.role === 'admin' && (
            <Link to="/admin" className="nav-link">
              👥 Administration
            </Link>
          )}
        </div>

        <div className="navbar-user">
          {user && (
            <>
              <span className="user-info">
                👤 {user.username} ({user.role})
              </span>
              <button onClick={handleLogout} className="btn-logout">
                🚪 Déconnexion
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
