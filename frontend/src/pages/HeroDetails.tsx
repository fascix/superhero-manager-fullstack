import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { getHeroById, deleteHero } from '../api/heroApi';
import type { Hero } from '../types/Hero';
import { useAuth } from '../hooks/useAuth';

export const HeroDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hero, setHero] = useState<Hero | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchHero = useCallback(async (heroId: string) => {
    try {
      const response = await getHeroById(heroId);
      setHero(response.data);
    } catch (error) {
      alert('Erreur lors du chargement du héros');
      console.error(error);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (id) {
      fetchHero(id);
    }
  }, [id, fetchHero]);

  const handleDelete = async () => {
    if (!hero || !id) return;
    
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer ${hero.nom} ?`)) {
      return;
    }

    try {
      await deleteHero(id);
      alert('Héros supprimé avec succès');
      navigate('/dashboard');
    } catch (error) {
      alert('Erreur lors de la suppression');
      console.error(error);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-hero/${id}`);
  };

  if (loading) {
    return (
      <div className="hero-details-page">
        <Navbar />
        <div className="page-container">
          <div className="loading">Chargement...</div>
        </div>
      </div>
    );
  }

  if (!hero) {
    return (
      <div className="hero-details-page">
        <Navbar />
        <div className="page-container">
          <div className="error">Héros non trouvé</div>
        </div>
      </div>
    );
  }

  return (
    <div className="hero-details-page">
      <Navbar />
      <div className="page-container">
        <div className="page-header">
          <button onClick={() => navigate('/dashboard')} className="btn-back">
            ← Retour au tableau de bord
          </button>
          <div className="header-actions">
            {user && (user.role === 'admin' || user.role === 'editor') && (
              <button onClick={handleEdit} className="btn-edit">
                ✏️ Modifier
              </button>
            )}
            {user && user.role === 'admin' && (
              <button onClick={handleDelete} className="btn-delete">
                🗑️ Supprimer
              </button>
            )}
          </div>
        </div>

        <div className="hero-details-content">
          <div className="hero-image-section">
            {hero.image ? (
              <img 
                src={`http://localhost:5000${hero.image}`} 
                alt={hero.nom} 
                className="hero-detail-image"
              />
            ) : (
              <div className="no-image-large">🦸</div>
            )}
          </div>

          <div className="hero-info-section">
            <h1 className="hero-title">{hero.nom}</h1>
            <p className="hero-alias-detail">Alias: {hero.alias}</p>
            
            <div className="hero-meta">
              <span className={`univers-badge univers-${hero.univers.toLowerCase()}`}>
                {hero.univers}
              </span>
            </div>

            <div className="info-block">
              <h2>📖 Description</h2>
              <p>{hero.description}</p>
            </div>

            <div className="info-block">
              <h2>⚡ Pouvoirs</h2>
              <div className="powers-list">
                {hero.pouvoirs.map((pouvoir, index) => (
                  <span key={index} className="power-badge">
                    {pouvoir}
                  </span>
                ))}
              </div>
            </div>

            {hero.origine && (
              <div className="info-block">
                <h2>🌍 Origine</h2>
                <p>{hero.origine}</p>
              </div>
            )}

            {hero.premiereApparition && (
              <div className="info-block">
                <h2>📅 Première apparition</h2>
                <p>{hero.premiereApparition}</p>
              </div>
            )}

            {hero.createdAt && (
              <div className="info-block">
                <h2>📝 Date d'ajout</h2>
                <p>{new Date(hero.createdAt).toLocaleDateString('fr-FR')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
