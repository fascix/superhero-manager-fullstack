// frontend/src/components/HeroForm.tsx
import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import type { Hero } from "../types/Hero";
import * as yup from "yup";

// Schéma de validation Yup
const heroSchema = yup.object().shape({
	nom: yup
		.string()
		.required("Le nom est requis")
		.min(2, "Le nom doit contenir au moins 2 caractères"),
	alias: yup
		.string()
		.required("L'alias est requis")
		.min(2, "L'alias doit contenir au moins 2 caractères"),
	univers: yup.string().required("L'univers est requis"),
	description: yup
		.string()
		.required("La description est requise")
		.min(10, "La description doit contenir au moins 10 caractères"),
});

interface HeroFormProps {
	hero?: Hero;
	onSubmit: (formData: FormData) => Promise<void>;
	submitLabel: string;
}

export const HeroForm = ({ hero, onSubmit, submitLabel }: HeroFormProps) => {
	const [nom, setNom] = useState(hero?.nom || "");
	const [alias, setAlias] = useState(hero?.alias || "");
	const [univers, setUnivers] = useState(hero?.univers || "Marvel");
	const [description, setDescription] = useState(hero?.description || "");
	const [origine, setOrigine] = useState(hero?.origine || "");
	const [premiereApparition, setPremiereApparition] = useState(
		hero?.premiereApparition || ""
	);
	const [image, setImage] = useState<File | null>(null);
	const [submitting, setSubmitting] = useState(false);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	// Stats de pouvoirs
	const [stats, setStats] = useState(
		hero?.stats || {
			intelligence: 50,
			strength: 50,
			speed: 50,
			durability: 50,
			power: 50,
			combat: 50,
		}
	);

	useEffect(() => {
		if (hero) {
			setNom(hero.nom);
			setAlias(hero.alias);
			setUnivers(hero.univers);
			setDescription(hero.description);
			setOrigine(hero.origine || "");
			setPremiereApparition(hero.premiereApparition || "");
			setStats(
				hero.stats || {
					intelligence: 50,
					strength: 50,
					speed: 50,
					durability: 50,
					power: 50,
					combat: 50,
				}
			);
		}
	}, [hero]);

	const handleStatChange = (statName: keyof typeof stats, value: number) => {
		setStats({ ...stats, [statName]: value });
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setSubmitting(true);
		setErrors({});

		try {
			await heroSchema.validate(
				{ nom, alias, univers, description },
				{ abortEarly: false }
			);
		} catch (err: any) {
			const validationErrors: { [key: string]: string } = {};
			err.inner?.forEach((error: any) => {
				if (error.path) {
					validationErrors[error.path] = error.message;
				}
			});
			setErrors(validationErrors);
			setSubmitting(false);
			return;
		}

		const formData = new FormData();
		formData.append("nom", nom);
		formData.append("alias", alias);
		formData.append("univers", univers);
		formData.append("description", description);
		formData.append("origine", origine);
		formData.append("premiereApparition", premiereApparition);
		formData.append("stats", JSON.stringify(stats));

		if (image) {
			formData.append("image", image);
		}

		try {
			await onSubmit(formData);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			{/* Champs existants */}
			<div className="row">
				<div className="col-md-6 mb-3">
					<label className="form-label">Nom *</label>
					<input
						type="text"
						className={`form-control ${errors.nom ? "is-invalid" : ""}`}
						value={nom}
						onChange={(e) => setNom(e.target.value)}
					/>
					{errors.nom && <div className="invalid-feedback">{errors.nom}</div>}
				</div>
				<div className="col-md-6 mb-3">
					<label className="form-label">Alias *</label>
					<input
						type="text"
						className={`form-control ${errors.alias ? "is-invalid" : ""}`}
						value={alias}
						onChange={(e) => setAlias(e.target.value)}
					/>
					{errors.alias && (
						<div className="invalid-feedback">{errors.alias}</div>
					)}
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
					className={`form-control ${errors.description ? "is-invalid" : ""}`}
					rows={4}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				{errors.description && (
					<div className="invalid-feedback">{errors.description}</div>
				)}
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

			{/* Section des statistiques */}
			<h5 className="mt-4 mb-3">⚡ Statistiques</h5>
			<div className="row">
				{Object.keys(stats).map((statName) => (
					<div key={statName} className="col-md-6 mb-3">
						<label className="form-label text-capitalize">
							{statName}:{" "}
							<strong>{stats[statName as keyof typeof stats]}</strong>
						</label>
						<input
							type="range"
							className="form-range"
							min="0"
							max="100"
							value={stats[statName as keyof typeof stats]}
							onChange={(e) =>
								handleStatChange(
									statName as keyof typeof stats,
									Number(e.target.value)
								)
							}
						/>
					</div>
				))}
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

			<button type="submit" className="btn btn-primary" disabled={submitting}>
				{submitting ? "En cours..." : submitLabel}
			</button>
		</form>
	);
};
