// frontend/src/components/HeroForm.tsx
import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import type { Hero } from '../types/Hero';

interface HeroFormProps {
  hero?: Hero;
  onSubmit: (formData: FormData) => Promise<void>;
  submitLabel: string;
}

export const HeroForm = ({ hero, onSubmit, submitLabel }: HeroFormProps) => {
  const [nom, setNom] = useState(hero?.nom || '');
  const [alias, setAlias] = useState(hero?.alias || '');
  const [univers, setUnivers] = useState(hero?.univers || 'Marvel');
  const [description, setDescription] = useState(hero?.description || '');
  const [pouvoirs, setPouvoirs] = useState(hero?.pouvoirs?.join(', ') || '');
  const [origine, setOrigine] = useState(hero?.origine || '');
  const [premiereApparition, setPremiereApparition] = useState(hero?.premiereApparition || '');
  const [image, setImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (hero) {
      setNom(hero.nom);
      setAlias(hero.alias);
      setUnivers(hero.univers);
      setDescription(hero.description);
      setPouvoirs(hero.pouvoirs?.join(', ') || '');
      setOrigine(hero.origine || '');
      setPremiereApparition(hero.premiereApparition || '');
    }
  }, [hero]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('alias', alias);
    formData.append('univers', univers);
    formData.append('description', description);
    formData.append('pouvoirs', JSON.stringify(pouvoirs.split(',').map(p => p.trim())));
    formData.append('origine', origine);
    formData.append('premiereApparition', premiereApparition);
    
    if (image) {
      formData.append('image', image);
    }

    try {
      await onSubmit(formData);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Nom *</label>
          <input
            type="text"
            className="form-control"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Alias *</label>
          <input
            type="text"
            className="form-control"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Univers *</label>
          <select
            className="form-select"
            value={univers}
            onChange={(e) => setUnivers(e.target.value)}
            required
          >
            <option value="Marvel">Marvel</option>
            <option value="DC">DC</option>
            <option value="Autre">Autre</option>
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Première apparition</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ex: 1962"
            value={premiereApparition}
            onChange={(e) => setPremiereApparition(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Description *</label>
        <textarea
          className="form-control"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Pouvoirs (séparés par des virgules) *</label>
        <input
          type="text"
          className="form-control"
          placeholder="Ex: Super force, Vol, Vision laser"
          value={pouvoirs}
          onChange={(e) => setPouvoirs(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Origine</label>
        <input
          type="text"
          className="form-control"
          placeholder="Ex: Krypton"
          value={origine}
          onChange={(e) => setOrigine(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Image</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
        {hero?.image && !image && (
          <small className="text-muted">Image actuelle: {hero.image}</small>
        )}
      </div>

      <button 
        type="submit" 
        className="btn btn-primary"
        disabled={submitting}
      >
        {submitting ? 'En cours...' : submitLabel}
      </button>
    </form>
  );
};
