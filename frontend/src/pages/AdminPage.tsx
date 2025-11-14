import { Navbar } from '../components/Navbar';

export const AdminPage = () => {
  return (
    <div className="admin-page">
      <Navbar />
      <div className="page-container">
        <h1>👥 Administration</h1>
        <div className="admin-content">
          <p>Page d'administration - Fonctionnalité à implémenter</p>
          <p>Cette page pourrait contenir :</p>
          <ul>
            <li>Liste des utilisateurs</li>
            <li>Gestion des rôles</li>
            <li>Historique des actions (logs)</li>
            <li>Statistiques de l'application</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
