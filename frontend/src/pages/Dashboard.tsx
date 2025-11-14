import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getAllHeroes } from "../api/heroApi";
import type { Hero } from "../types/Hero";
import { HeroCard } from "../components/HeroCard";
import { SearchBar } from "../components/SearchBar";
import { Navbar } from "../components/Navbar";

export const Dashboard = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [universFilter, setUniversFilter] = useState("");
  const navigate = useNavigate();

  const fetchHeroes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAllHeroes(searchTerm, universFilter);
      setHeroes(response.data);
      setError("");
    } catch (err) {
      setError("Erreur lors du chargement des héros");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, universFilter]);

  useEffect(() => {
    fetchHeroes();
  }, [fetchHeroes]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (univers: string) => {
    setUniversFilter(univers);
  };

  const handleAddHero = () => {
    navigate("/add-hero");
  };

  return (
    <div className="dashboard">
      <Navbar />
      
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>🦸 Tableau de bord SuperHero Manager</h1>
          <button className="btn-add" onClick={handleAddHero}>
            ➕ Ajouter un héros
          </button>
        </div>

        <SearchBar 
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          currentFilter={universFilter}
        />

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Chargement des héros...</div>
        ) : (
          <div className="heroes-grid">
            {heroes.length === 0 ? (
              <p className="no-heroes">Aucun héros trouvé</p>
            ) : (
              heroes.map((hero) => (
                <HeroCard key={hero._id} hero={hero} onRefresh={fetchHeroes} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
