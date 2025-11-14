import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { HeroForm } from '../components/HeroForm';
import { createHero } from '../api/heroApi';

export const AddHero = () => {
  const navigate = useNavigate();

  const handleSubmit = async (heroData: FormData) => {
    try {
      await createHero(heroData);
      alert('Héros créé avec succès !');
      navigate('/dashboard');
    } catch (error) {
      alert('Erreur lors de la création du héros');
      console.error(error);
    }
  };

  return (
    <div className="add-hero-page">
      <Navbar />
      <div className="page-container">
        <div className="page-header">
          <h1>➕ Ajouter un nouveau héros</h1>
          <button onClick={() => navigate('/dashboard')} className="btn-back">
            ← Retour
          </button>
        </div>
        <HeroForm onSubmit={handleSubmit} submitLabel="Créer le héros" />
      </div>
    </div>
  );
};
