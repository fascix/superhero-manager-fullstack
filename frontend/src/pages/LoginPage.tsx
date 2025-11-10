// frontend/src/pages/LoginPage.tsx
import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { login } from '../api/heroApi';
import { useAuth } from "../hooks/useAuth";

export const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { login: authLogin } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError("");

		try {
			const response = await login(username, password);
			authLogin(response.data.token, response.data.user);
			navigate("/dashboard");
		} catch (err: unknown) {
			if (err && typeof err === "object" && "response" in err) {
				const error = err as { response?: { data?: { message?: string } } };
				setError(error.response?.data?.message || "Erreur de connexion");
			} else {
				setError("Erreur de connexion");
			}
		}
	};

	return (
		<div style={{ maxWidth: "400px", margin: "100px auto", padding: "20px" }}>
			<h1>🦸 Connexion SuperHero Manager</h1>
			{error && <p style={{ color: "red" }}>{error}</p>}

			<form onSubmit={handleSubmit}>
				<div style={{ marginBottom: "15px" }}>
					<label>Nom d'utilisateur:</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						style={{ width: "100%", padding: "8px", marginTop: "5px" }}
					/>
				</div>

				<div style={{ marginBottom: "15px" }}>
					<label>Mot de passe:</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						style={{ width: "100%", padding: "8px", marginTop: "5px" }}
					/>
				</div>

				<button
					type="submit"
					style={{
						width: "100%",
						padding: "10px",
						background: "#007bff",
						color: "white",
						border: "none",
						cursor: "pointer",
						borderRadius: "4px",
					}}
				>
					Se connecter
				</button>
			</form>
		</div>
	);
};
