import { useState } from 'react';
import type { Hero } from '../types/Hero';

interface HeroFormProps {
  initialData?: Hero;
  onSubmit: (heroData: FormData) => void;
  submitLabel: string;
}

export const HeroForm = ({ initialData, onSubmit, submitLabel }: HeroFormProps) => {
  const [formData, setFormData] = useState({
    nom: initialData?.nom || '',
    alias: initialData?.alias || '',
    univers: initialData?.univers || 'Marvel',
    pouvoirs: initialData?.pouvoirs.join(', ') || '',
    description: initialData?.description || '',
    origine: initialData?.origine || '',
    premiereApparition: initialData?.premiereApparition || '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(
    initialData?.image ? `http://localhost:5000${initialData.image}` : ''
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('nom', formData.nom);
    data.append('alias', formData.alias);
    data.append('univers', formData.univers);
    data.append('description', formData.description);
    data.append('origine', formData.origine);
    data.append('premiereApparition', formData.premiereApparition);
    
    // Convertir les pouvoirs en tableau
    const pouvoirsArray = formData.pouvoirs
      .split(',')
      .map(p => p.trim())
      .filter(p => p.length > 0);
    
    pouvoirsArray.forEach(pouvoir => {
      data.append('pouvoirs', pouvoir);
    });
    
    if (imageFile) {
      data.append('image', imageFile);
    }
    
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="hero-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="nom">Nom du héros *</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="alias">Alias / Nom civil *</label>
          <input
            type="text"
            id="alias"
            name="alias"
            value={formData.alias}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="univers">Univers *</label>
        <select
          id="univers"
          name="univers"
          value={formData.univers}
          onChange={handleChange}
          required
        >
          <option value="Marvel">Marvel</option>
          <option value="DC">DC Comics</option>
          <option value="Autre">Autre</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="pouvoirs">Pouvoirs (séparés par des virgules) *</label>
        <input
          type="text"
          id="pouvoirs"
          name="pouvoirs"
          value={formData.pouvoirs}
          onChange={handleChange}
          placeholder="Ex: Vol, Super force, Télépathie"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="origine">Origine</label>
          <input
            type="text"
            id="origine"
            name="origine"
            value={formData.origine}
            onChange={handleChange}
            placeholder="Ex: Krypton, New York"
          />
        </div>

        <div className="form-group">
          <label htmlFor="premiereApparition">Première apparition</label>
          <input
            type="text"
            id="premiereApparition"
            name="premiereApparition"
            value={formData.premiereApparition}
            onChange={handleChange}
            placeholder="Ex: Action Comics #1 (1938)"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="image">Image du héros</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Aperçu" />
          </div>
        )}
      </div>

      <button type="submit" className="btn-submit">
        {submitLabel}
      </button>
    </form>
  );
};
