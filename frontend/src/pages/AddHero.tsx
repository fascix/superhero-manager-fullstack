// frontend/src/pages/AddHero.tsx
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { HeroForm } from '../components/HeroForm';
import { createHero } from '../api/heroApi';

export const AddHero = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData: FormData) => {
    try {
      await createHero(formData);
      alert('Héros créé avec succès !');
      navigate('/dashboard');
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      alert('Erreur lors de la création du héros');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow">
              <div className="card-body">
                <h2 className="card-title mb-4">➕ Ajouter un nouveau héros</h2>
                <HeroForm onSubmit={handleSubmit} submitLabel="Créer le héros" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
