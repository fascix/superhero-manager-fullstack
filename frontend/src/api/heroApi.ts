// frontend/src/api/heroApi.ts
import axios from "axios";

// Configuration Axios
const API = axios.create({
	baseURL: "http://localhost:5000/api",
});

// Intercepteur pour ajouter le token JWT automatiquement
API.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// Export par défaut de l'instance Axios
export default API; // ← AJOUT

// ========== API HEROES ==========
export const getAllHeroes = (search?: string, univers?: string) => {
	let url = "/heroes?";
	if (search) url += `search=${search}&`;
	if (univers) url += `univers=${univers}`;
	return API.get(url);
};

export const getHeroById = (id: string) => API.get(`/heroes/${id}`);

export const createHero = (heroData: FormData) =>
	API.post("/heroes", heroData, {
		headers: { "Content-Type": "multipart/form-data" },
	});

export const updateHero = (id: string, heroData: FormData) =>
	API.put(`/heroes/${id}`, heroData, {
		headers: { "Content-Type": "multipart/form-data" },
	});

export const deleteHero = (id: string) => API.delete(`/heroes/${id}`);

// ========== API AUTH ==========
export const register = (username: string, password: string, role: string) =>
	API.post("/auth/register", { username, password, role });

export const login = (username: string, password: string) =>
	API.post("/auth/login", { username, password });

export const verifyToken = () => API.get("/auth/verify");
