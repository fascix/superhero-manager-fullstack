import axios from "axios";

const API_URL = "http://localhost:5001/api/users";

// Créer un intercepteur pour ajouter le token JWT à chaque requête
const getAuthHeader = () => {
	const token = localStorage.getItem("token");
	return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getAllUsers = () => {
	return axios.get(API_URL, { headers: getAuthHeader() });
};

export const getUserById = (id: string) => {
	return axios.get(`${API_URL}/${id}`, { headers: getAuthHeader() });
};

export const createUser = (userData: {
	username: string;
	password: string;
	role: string;
}) => {
	return axios.post(API_URL, userData, { headers: getAuthHeader() });
};

export const updateUser = (
	id: string,
	userData: { username?: string; password?: string; role?: string }
) => {
	return axios.put(`${API_URL}/${id}`, userData, { headers: getAuthHeader() });
};

export const deleteUser = (id: string) => {
	return axios.delete(`${API_URL}/${id}`, { headers: getAuthHeader() });
};
