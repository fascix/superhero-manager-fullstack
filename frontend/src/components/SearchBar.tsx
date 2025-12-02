// frontend/src/components/SearchBar.tsx
import { useState, useEffect } from "react";

interface SearchBarProps {
	onSearch: (searchTerm: string, univers: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [univers, setUnivers] = useState("");
	const [sortBy, setSortBy] = useState("");

	// Recherche en temps réel dès que l'utilisateur tape
	useEffect(() => {
		onSearch(sortBy || searchTerm, univers);
	}, [searchTerm, univers, sortBy, onSearch]);

	const handleSortChange = (value: string) => {
		setSortBy(value);
		setSearchTerm(""); // Clear search when sorting
	};

	return (
		<div className="row g-3 mb-4">
			<div className="col-md-4">
				<input
					type="text"
					className="form-control"
					placeholder="🔍 Rechercher par nom ou alias..."
					value={searchTerm}
					onChange={(e) => {
						setSearchTerm(e.target.value);
						setSortBy(""); // Clear sort when searching
					}}
					disabled={!!sortBy}
				/>
			</div>
			<div className="col-md-4">
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
			<div className="col-md-4">
				<select
					className="form-select"
					value={sortBy}
					onChange={(e) => handleSortChange(e.target.value)}
				>
					<option value="">📊 Trier par...</option>
					<option value="alpha_asc">A → Z</option>
					<option value="alpha_desc">Z → A</option>
					<option value="date_desc">📅 Plus récents</option>
					<option value="date_asc">📅 Plus anciens</option>
				</select>
			</div>
		</div>
	);
};
