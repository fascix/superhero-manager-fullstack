// frontend/src/pages/Dashboard.tsx
import { useState, useEffect, useCallback } from "react";
import { Navbar } from "../components/Navbar";
import { SearchBar } from "../components/SearchBar";
import { HeroCard } from "../components/HeroCard";
import { normalizeString } from "../utils/stringUtils";
import { getAllHeroes } from "../api/heroApi";
import type { Hero } from "../types/Hero";

export const Dashboard = () => {
	const [heroes, setHeroes] = useState<Hero[]>([]);
	const [filteredHeroes, setFilteredHeroes] = useState<Hero[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	// Charger tous les héros au démarrage
	useEffect(() => {
		loadHeroes();
	}, []);

	const loadHeroes = async () => {
		try {
			setLoading(true);
			const response = await getAllHeroes();
			setHeroes(response.data);
			setFilteredHeroes(response.data);
			setError("");
		} catch (err) {
			console.error("Erreur lors du chargement des héros:", err);
			setError("Erreur lors du chargement des héros");
		} finally {
			setLoading(false);
		}
	};

	// Fonction de recherche avec normalisation des caractères
	const handleSearch = useCallback(
		(searchTerm: string, univers: string) => {
			let filtered = heroes;

			// Filtre par univers
			// Note: Les données JSON peuvent avoir "Marvel Comics" ou "DC Comics", donc on vérifie si ça inclut le terme
			if (univers) {
				filtered = filtered.filter(
					(hero) =>
						hero.univers &&
						hero.univers.toLowerCase().includes(univers.toLowerCase())
				);
			}

			// Filtre par nom ou alias avec normalisation
			if (searchTerm) {
				const normalizedSearch = normalizeString(searchTerm);
				filtered = filtered.filter((hero) => {
					const normalizedNom = normalizeString(hero.nom);
					const normalizedAlias = normalizeString(hero.alias);
					return (
						normalizedNom.includes(normalizedSearch) ||
						normalizedAlias.includes(normalizedSearch)
					);
				});
			}

			setFilteredHeroes(filtered);
		},
		[heroes]
	);

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

	if (error) {
		return (
			<>
				<Navbar />
				<div className="container">
					<div className="alert alert-danger mt-4" role="alert">
						{error}
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<Navbar />
			<div className="container">
				<h1 className="text-center mb-4">🦸 Galerie des Super-Héros</h1>

				<SearchBar onSearch={handleSearch} />

				{filteredHeroes.length === 0 ? (
					<div className="alert alert-info text-center" role="alert">
						Aucun héros trouvé. Essayez une autre recherche.
					</div>
				) : (
					<>
						<p className="text-muted mb-3">
							{filteredHeroes.length} héros trouvé
							{filteredHeroes.length > 1 ? "s" : ""}
						</p>
						<div className="row">
							{filteredHeroes.map((hero) => (
								<HeroCard key={hero._id} hero={hero} onDelete={loadHeroes} />
							))}
						</div>
					</>
				)}
			</div>
		</>
	);
};
