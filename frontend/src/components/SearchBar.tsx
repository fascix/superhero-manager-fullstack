// frontend/src/components/SearchBar.tsx
import { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string, univers: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [univers, setUnivers] = useState('');

  // Recherche en temps réel dès que l'utilisateur tape
  useEffect(() => {
    onSearch(searchTerm, univers);
  }, [searchTerm, univers, onSearch]);

  return (
    <div className="row g-3 mb-4">
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Rechercher par nom ou alias..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="col-md-3">
        <select
          className="form-select"
          value={univers}
          onChange={(e) => setUnivers(e.target.value)}
        >
          <option value="">🌍 Tous les univers</option>
          <option value="Marvel">Marvel</option>
          <option value="DC">DC</option>
          <option value="Autre">Autre</option>
        </select>
      </div>
    </div>
  );
};
