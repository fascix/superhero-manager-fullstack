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
				if (univers === "Autre") {
					filtered = filtered.filter(
						(hero) =>
							hero.univers &&
							!hero.univers.toLowerCase().includes("marvel") &&
							!hero.univers.toLowerCase().includes("dc")
					);
				} else {
					filtered = filtered.filter(
						(hero) =>
							hero.univers &&
							hero.univers.toLowerCase().includes(univers.toLowerCase())
					);
				}
			}

			// Filtre par date d’ajout ou ordre alphabétique
			if (searchTerm === "date_asc") {
				filtered = [...filtered].sort(
					(a, b) =>
						new Date(a.DateCreated || 0).getTime() -
						new Date(b.DateCreated || 0).getTime()
				);
			} else if (searchTerm === "date_desc") {
				filtered = [...filtered].sort(
					(a, b) =>
						new Date(b.DateCreated || 0).getTime() -
						new Date(a.DateCreated || 0).getTime()
				);
			} else if (searchTerm === "alpha_asc") {
				filtered = [...filtered].sort((a, b) => a.nom.localeCompare(b.nom));
			} else if (searchTerm === "alpha_desc") {
				filtered = [...filtered].sort((a, b) => b.nom.localeCompare(a.nom));
			}

			// Filtre par nom ou alias avec normalisation (uniquement si ce n'est pas une option de tri)
			const isSortOption = [
				"date_asc",
				"date_desc",
				"alpha_asc",
				"alpha_desc",
			].includes(searchTerm);

			if (searchTerm && !isSortOption) {
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
