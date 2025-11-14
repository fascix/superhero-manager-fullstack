import { useState } from 'react';

interface SearchBarProps {
  onSearch: (term: string) => void;
  onFilterChange: (univers: string) => void;
  currentFilter: string;
}

export const SearchBar = ({ onSearch, onFilterChange, currentFilter }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(e.target.value);
  };

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="🔍 Rechercher par nom ou alias..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      
      <div className="filter-wrapper">
        <label htmlFor="univers-filter">Univers:</label>
        <select 
          id="univers-filter"
          value={currentFilter} 
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="">Tous</option>
          <option value="Marvel">Marvel</option>
          <option value="DC">DC Comics</option>
          <option value="Autre">Autre</option>
        </select>
      </div>
    </div>
  );
};
