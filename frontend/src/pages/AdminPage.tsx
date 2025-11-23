// frontend/src/pages/AdminPage.tsx
import { Navbar } from '../components/Navbar';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

export const AdminPage = () => {
  const { user } = useAuth();

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h1 className="mb-4">👑 Administration</h1>
        
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">📊 Statistiques</h5>
                <p className="card-text">
                  Bienvenue dans l'espace d'administration réservé aux administrateurs.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">🔐 Gestion des utilisateurs</h5>
                <p className="card-text">
                  Section de gestion des utilisateurs (à implémenter).
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="alert alert-info" role="alert">
          <strong>Note:</strong> Les fonctionnalités de journalisation (logs) seront ajoutées ultérieurement.
        </div>
      </div>
    </>
  );
};
