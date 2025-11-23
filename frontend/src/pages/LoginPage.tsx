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
		<div className="container d-flex justify-content-center align-items-center vh-100">
			<div
				className="card shadow-lg p-4"
				style={{ maxWidth: "400px", width: "100%" }}
			>
				<div className="text-center mb-4">
					<h1 className="h3 mb-3 font-weight-normal">🦸 Connexion</h1>
					<p className="text-muted">SuperHero Manager</p>
				</div>

				{error && <div className="alert alert-danger">{error}</div>}

				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label className="form-label">Nom d'utilisateur</label>
						<input
							type="text"
							className="form-control"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
							autoFocus
						/>
					</div>

					<div className="mb-4">
						<label className="form-label">Mot de passe</label>
						<input
							type="password"
							className="form-control"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>

					<button type="submit" className="btn btn-primary w-100 py-2">
						Se connecter
					</button>
				</form>
			</div>
		</div>
	);
};
