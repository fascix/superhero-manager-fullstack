import { useNavigate } from 'react-router-dom';
import type { Hero } from '../types/Hero';
import { deleteHero } from '../api/heroApi';
import { useAuth } from '../hooks/useAuth';

interface HeroCardProps {
  hero: Hero;
  onRefresh: () => void;
}

export const HeroCard = ({ hero, onRefresh }: HeroCardProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleDelete = async () => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer ${hero.nom} ?`)) {
      return;
    }

    try {
      await deleteHero(hero._id!);
      alert('Héros supprimé avec succès');
      onRefresh();
    } catch (error) {
      alert('Erreur lors de la suppression');
      console.error(error);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-hero/${hero._id}`);
  };

  const handleViewDetails = () => {
    navigate(`/hero/${hero._id}`);
  };

  return (
    <div className="hero-card">
      <div className="hero-card-image" onClick={handleViewDetails}>
        {hero.image ? (
          <img src={`http://localhost:5000${hero.image}`} alt={hero.nom} />
        ) : (
          <div className="no-image">🦸</div>
        )}
      </div>
      
      <div className="hero-card-content">
        <h3>{hero.nom}</h3>
        <p className="hero-alias">{hero.alias}</p>
        <span className={`hero-univers univers-${hero.univers.toLowerCase()}`}>
          {hero.univers}
        </span>
        
        <div className="hero-powers">
          {hero.pouvoirs.slice(0, 2).map((pouvoir, index) => (
            <span key={index} className="power-tag">{pouvoir}</span>
          ))}
          {hero.pouvoirs.length > 2 && (
            <span className="power-tag">+{hero.pouvoirs.length - 2}</span>
          )}
        </div>

        <div className="hero-actions">
          <button className="btn-view" onClick={handleViewDetails}>
            👁️ Voir
          </button>
          {user && (user.role === 'admin' || user.role === 'editor') && (
            <button className="btn-edit" onClick={handleEdit}>
              ✏️ Modifier
            </button>
          )}
          {user && user.role === 'admin' && (
            <button className="btn-delete" onClick={handleDelete}>
              🗑️ Supprimer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
