// frontend/src/pages/HeroDetails.tsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { getHeroById } from "../api/heroApi";
import type { Hero } from "../types/Hero";

// Fonction pour extraire les stats de l'ancien format 'pouvoirs'
const getStatsFromPouvoirs = (pouvoirs: any[]): Hero["stats"] => {
	const stats: any = {};
	if (!pouvoirs || !Array.isArray(pouvoirs)) return stats;

	pouvoirs.forEach((item: string) => {
		const [key, val] = item.split(":");
		if (key && val) {
			const cleanKey = key.trim().toLowerCase();
			const cleanVal = parseInt(val.trim(), 10);
			if (!isNaN(cleanVal)) {
				stats[cleanKey] = cleanVal;
			}
		}
	});
	return stats;
};

export const HeroDetails = () => {
	const { id } = useParams<{ id: string }>();
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
			console.error("Erreur lors du chargement:", error);
		} finally {
			setLoading(false);
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
					<Link to="/dashboard" className="btn btn-primary">
						Retour à l'accueil
					</Link>
				</div>
			</>
		);
	}

	// L'image peut déjà contenir /uploads/ depuis le backend
	const imageUrl = hero.image
		? hero.image.startsWith("/uploads/")
			? `http://localhost:5001${hero.image}`
			: `http://localhost:5001/uploads/${hero.image}`
		: "/placeholder.svg";

	// Logique de réparation des stats
	let displayStats = hero.stats;
	const isStatsDefault =
		hero.stats && Object.values(hero.stats).every((val) => val === 50);
	if ((!hero.stats || isStatsDefault) && (hero as any).pouvoirs) {
		const parsedStats = getStatsFromPouvoirs((hero as any).pouvoirs);
		if (Object.keys(parsedStats).length > 0) {
			displayStats = parsedStats;
		}
	}

	return (
		<>
			<Navbar />
			<div className="container mt-4">
				<Link to="/dashboard" className="btn btn-outline-secondary mb-3">
					← Retour
				</Link>

				<div className="card shadow-lg">
					<div className="row g-0">
						<div className="col-md-4">
							<img
								src={imageUrl}
								className="img-fluid rounded-start"
								alt={hero.nom}
								style={{ height: "100%", objectFit: "cover" }}
							/>
						</div>
						<div className="col-md-8">
							<div className="card-body">
								<h1 className="card-title">{hero.nom}</h1>
								<h4 className="text-muted mb-3">{hero.alias}</h4>
								<div className="mb-3">
									<span
										className={`badge fs-6 ${
											hero.univers === "Marvel"
												? "bg-danger"
												: hero.univers === "DC"
												? "bg-primary"
												: "bg-secondary"
										}`}
									>
										{hero.univers}
									</span>
								</div>
								<div className="mb-4">
									<h5>📖 Description</h5>
									<p>{hero.description}</p>
								</div>

								{displayStats && (
									<div className="mb-4">
										<h5>⚡ Statistiques</h5>
										<div className="row">
											{Object.entries(displayStats).map(([statName, value]) => (
												<div className="col-md-6 mb-2" key={statName}>
													<small className="text-muted text-capitalize">
														{statName}
													</small>
													<div className="progress">
														<div
															className="progress-bar"
															role="progressbar"
															style={{ width: `${value}%` }}
														>
															{value}
														</div>
													</div>
												</div>
											))}
										</div>
									</div>
								)}

								{hero.origine && (
									<div className="mb-3">
										<h5>🌍 Origine</h5>
										<p>{hero.origine}</p>
									</div>
								)}
								{hero.premiereApparition && (
									<div className="mb-3">
										<h5>📅 Première apparition</h5>
										<p>{hero.premiereApparition}</p>
									</div>
								)}
								{hero.createdAt && (
									<div className="text-muted mt-4">
										<small>
											Ajouté le{" "}
											{new Date(hero.createdAt).toLocaleDateString("fr-FR")}
										</small>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
