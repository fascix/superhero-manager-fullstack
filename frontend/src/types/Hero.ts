// frontend/src/types/Hero.ts
export interface Hero {
	_id?: string;
	nom: string;
	alias: string;
	univers: string;
	pouvoirs: string[];
	description: string;
	image?: string;
	origine?: string;
	premiereApparition?: string;
	createdAt?: string;
	DateCreated?: Date;
	// Stats numériques de pouvoirs (0-100)
	stats?: {
		intelligence: number;
		strength: number;
		speed: number;
		durability: number;
		power: number;
		combat: number;
	};
}

// Types pour l'authentification
export interface User {
	id: string;
	username: string;
	role: "admin" | "editor" | "viewer";
}

export interface AuthResponse {
	message: string;
	token: string;
	user: User;
}
