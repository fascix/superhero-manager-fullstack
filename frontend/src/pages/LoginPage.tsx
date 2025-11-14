// frontend/src/pages/LoginPage.tsx
import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/heroApi";
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
		<div className="login-container">
			<div className="login-box">
				<h1>🦸 Connexion SuperHero Manager</h1>
				{error && <p className="login-error">{error}</p>}

				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label>Nom d'utilisateur:</label>
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</div>

					<div className="form-group">
						<label>Mot de passe:</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>

					<button type="submit" className="login-button">
						Se connecter
					</button>
				</form>
			</div>
		</div>
	);
};
