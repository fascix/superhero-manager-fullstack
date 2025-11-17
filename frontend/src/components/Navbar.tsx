// frontend/src/components/Navbar.tsx
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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/dashboard">
          🦸 SuperHero Manager
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                🏠 Accueil
              </Link>
            </li>
            
            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/add">
                  ➕ Ajouter un héros
                </Link>
              </li>
            )}
            
            {user?.role === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  👑 Admin
                </Link>
              </li>
            )}
          </ul>
          
          <div className="d-flex align-items-center">
            {user ? (
              <>
                <span className="text-light me-3">
                  👤 {user.username} 
                  <span className={`badge ms-2 ${user.role === 'admin' ? 'bg-danger' : 'bg-info'}`}>
                    {user.role}
                  </span>
                </span>
                <button 
                  onClick={handleLogout}
                  className="btn btn-outline-light btn-sm"
                >
                  🚪 Déconnexion
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-outline-light btn-sm">
                🔐 Connexion
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
