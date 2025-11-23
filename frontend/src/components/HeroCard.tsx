// frontend/src/components/HeroCard.tsx
import { Link } from "react-router-dom";
import type { Hero } from "../types/Hero";
import { useAuth } from "../hooks/useAuth";
import { deleteHero } from "../api/heroApi";

interface HeroCardProps {
	hero: Hero;
	onDelete?: () => void;
}

export const HeroCard = ({ hero, onDelete }: HeroCardProps) => {
	const { user } = useAuth();
	const imageUrl = hero.image
		? `http://localhost:5001/uploads/${hero.image}`
		: "/placeholder.svg";

	const handleDelete = async () => {
		if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${hero.nom} ?`)) {
			try {
				await deleteHero(hero._id!);
				if (onDelete) onDelete();
			} catch (error) {
				console.error("Erreur lors de la suppression:", error);
				alert("Erreur lors de la suppression du héros");
			}
		}
	};

	return (
		<div className="col-md-4 mb-4">
			<div className="card h-100 shadow-sm">
				<img
					src={imageUrl}
					className="card-img-top"
					alt={hero.nom}
					style={{ height: "300px", objectFit: "cover" }}
				/>
				<div className="card-body d-flex flex-column">
					<h5 className="card-title">{hero.nom}</h5>
					<p className="card-text text-muted">{hero.alias}</p>
					<div className="mb-2">
						<span
							className={`badge ${
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
					<p className="card-text text-truncate">{hero.description}</p>

					<div className="mt-auto">
						<Link
							to={`/hero/${hero._id}`}
							className="btn btn-sm btn-outline-primary me-2"
						>
							📖 Détails
						</Link>

						{user && user.role !== "viewer" && (
							<Link
								to={`/edit/${hero._id}`}
								className="btn btn-sm btn-outline-warning me-2"
							>
								✏️ Modifier
							</Link>
						)}

						{user?.role === "admin" && (
							<button
								onClick={handleDelete}
								className="btn btn-sm btn-outline-danger"
							>
								🗑️ Supprimer
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
