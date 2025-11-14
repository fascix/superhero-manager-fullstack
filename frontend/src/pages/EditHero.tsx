import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { HeroForm } from '../components/HeroForm';
import { getHeroById, updateHero } from '../api/heroApi';
import { Hero } from '../types/Hero';

export const EditHero = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hero, setHero] = useState<Hero | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchHero(id);
    }
  }, [id]);

  const fetchHero = async (heroId: string) => {
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
  };

  const handleSubmit = async (heroData: FormData) => {
    if (!id) return;
    
    try {
      await updateHero(id, heroData);
      alert('Héros modifié avec succès !');
      navigate('/dashboard');
    } catch (error) {
      alert('Erreur lors de la modification du héros');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="edit-hero-page">
        <Navbar />
        <div className="page-container">
          <div className="loading">Chargement...</div>
        </div>
      </div>
    );
  }

  if (!hero) {
    return (
      <div className="edit-hero-page">
        <Navbar />
        <div className="page-container">
          <div className="error">Héros non trouvé</div>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-hero-page">
      <Navbar />
      <div className="page-container">
        <div className="page-header">
          <h1>✏️ Modifier {hero.nom}</h1>
          <button onClick={() => navigate('/dashboard')} className="btn-back">
            ← Retour
          </button>
        </div>
        <HeroForm 
          initialData={hero} 
          onSubmit={handleSubmit} 
          submitLabel="Enregistrer les modifications" 
        />
      </div>
    </div>
  );
};
