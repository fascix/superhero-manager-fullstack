// frontend/src/pages/EditHero.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { HeroForm } from '../components/HeroForm';
import { getHeroById, updateHero } from '../api/heroApi';
import type { Hero } from '../types/Hero';

export const EditHero = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hero, setHero] = useState<Hero | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadHero(id);
    }
  }, [id]);

  const loadHero = async (heroId: string) => {
    try {
      const response = await getHeroById(heroId);
      setHero(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      alert('Erreur lors du chargement du héros');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    if (!id) return;
    
    try {
      await updateHero(id, formData);
      alert('Héros modifié avec succès !');
      navigate('/dashboard');
    } catch (error) {
      console.error('Erreur lors de la modification:', error);
      alert('Erreur lors de la modification du héros');
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container text-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      </>
    );
  }

  if (!hero) {
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="alert alert-danger mt-4" role="alert">
            Héros introuvable
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow">
              <div className="card-body">
                <h2 className="card-title mb-4">✏️ Modifier {hero.nom}</h2>
                <HeroForm hero={hero} onSubmit={handleSubmit} submitLabel="Enregistrer les modifications" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
