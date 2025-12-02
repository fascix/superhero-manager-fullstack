// frontend/src/pages/AdminPage.tsx
import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import {
	getAllUsers,
	createUser,
	updateUser,
	deleteUser,
} from "../api/userApi";

interface User {
	_id: string;
	username: string;
	role: "admin" | "editor" | "viewer";
	createdAt: string;
}

export const AdminPage = () => {
	const { user } = useAuth();
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [editingUser, setEditingUser] = useState<User | null>(null);
	const [formData, setFormData] = useState({
		username: "",
		password: "",
		role: "viewer",
	});

	useEffect(() => {
		if (user?.role === "admin") {
			loadUsers();
		}
	}, [user]);

	const loadUsers = async () => {
		try {
			setLoading(true);
			const response = await getAllUsers();
			setUsers(response.data);
		} catch (error) {
			console.error("Erreur lors du chargement des utilisateurs:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			if (editingUser) {
				await updateUser(editingUser._id, formData);
			} else {
				await createUser(formData);
			}
			setShowModal(false);
			setFormData({ username: "", password: "", role: "viewer" });
			setEditingUser(null);
			loadUsers();
		} catch (error) {
			console.error("Erreur lors de la sauvegarde:", error);
			alert("Erreur lors de la sauvegarde de l'utilisateur");
		}
	};

	const handleEdit = (user: User) => {
		setEditingUser(user);
		setFormData({
			username: user.username,
			password: "",
			role: user.role,
		});
		setShowModal(true);
	};

	const handleDelete = async (userId: string) => {
		if (
			!window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")
		) {
			return;
		}
		try {
			await deleteUser(userId);
			loadUsers();
		} catch (error) {
			console.error("Erreur lors de la suppression:", error);
			alert("Erreur lors de la suppression de l'utilisateur");
		}
	};

	const openCreateModal = () => {
		setEditingUser(null);
		setFormData({ username: "", password: "", role: "viewer" });
		setShowModal(true);
	};

	if (user?.role !== "admin") {
		return <Navigate to="/dashboard" replace />;
	}

	return (
		<>
			<Navbar />
			<div className="container mt-4">
				<h1 className="mb-4">👑 Administration</h1>

				<div className="row">
					<div className="col-md-6 mb-4">
						<div className="card shadow">
							<div className="card-body">
								<h5 className="card-title">📊 Statistiques</h5>
								<p className="card-text">
									Total des utilisateurs: <strong>{users.length}</strong>
								</p>
								<ul className="list-unstyled">
									<li>
										🔴 Admins: {users.filter((u) => u.role === "admin").length}
									</li>
									<li>
										🟡 Éditeurs:{" "}
										{users.filter((u) => u.role === "editor").length}
									</li>
									<li>
										🟢 Visiteurs:{" "}
										{users.filter((u) => u.role === "viewer").length}
									</li>
								</ul>
							</div>
						</div>
					</div>

					<div className="col-md-6 mb-4">
						<div className="card shadow">
							<div className="card-body">
								<h5 className="card-title">🔐 Gestion des utilisateurs</h5>
								<p className="card-text">
									Créer, modifier et supprimer des comptes utilisateurs.
								</p>
								<button className="btn btn-primary" onClick={openCreateModal}>
									➕ Ajouter un utilisateur
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="card shadow">
					<div className="card-body">
						<h5 className="card-title mb-3">👥 Liste des utilisateurs</h5>
						{loading ? (
							<div className="text-center">
								<div className="spinner-border" role="status">
									<span className="visually-hidden">Chargement...</span>
								</div>
							</div>
						) : (
							<div className="table-responsive">
								<table className="table table-hover">
									<thead>
										<tr>
											<th>Nom d'utilisateur</th>
											<th>Rôle</th>
											<th>Créé le</th>
											<th>Actions</th>
										</tr>
									</thead>
									<tbody>
										{users.map((u) => (
											<tr key={u._id}>
												<td>{u.username}</td>
												<td>
													<span
														className={`badge ${
															u.role === "admin"
																? "bg-danger"
																: u.role === "editor"
																? "bg-warning"
																: "bg-info"
														}`}
													>
														{u.role}
													</span>
												</td>
												<td>
													{new Date(u.createdAt).toLocaleDateString("fr-FR")}
												</td>
												<td>
													<button
														className="btn btn-sm btn-outline-primary me-2"
														onClick={() => handleEdit(u)}
													>
														✏️ Modifier
													</button>
													<button
														className="btn btn-sm btn-outline-danger"
														onClick={() => handleDelete(u._id)}
														disabled={u._id === user?.id}
													>
														🗑️ Supprimer
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</div>

				<div className="alert alert-info mt-4" role="alert">
					<strong>Note:</strong> Les logs sont maintenant enregistrés dans le
					dossier backend/logs
				</div>
			</div>

			{/* Modal pour créer/éditer un utilisateur */}
			{showModal && (
				<div
					className="modal show d-block"
					tabIndex={-1}
					style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
				>
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">
									{editingUser
										? "Modifier l'utilisateur"
										: "Nouvel utilisateur"}
								</h5>
								<button
									type="button"
									className="btn-close"
									onClick={() => setShowModal(false)}
								></button>
							</div>
							<form onSubmit={handleSubmit}>
								<div className="modal-body">
									<div className="mb-3">
										<label className="form-label">Nom d'utilisateur *</label>
										<input
											type="text"
											className="form-control"
											value={formData.username}
											onChange={(e) =>
												setFormData({
													...formData,
													username: e.target.value,
												})
											}
											required
										/>
									</div>
									<div className="mb-3">
										<label className="form-label">
											Mot de passe{" "}
											{editingUser ? "(laisser vide pour ne pas changer)" : "*"}
										</label>
										<input
											type="password"
											className="form-control"
											value={formData.password}
											onChange={(e) =>
												setFormData({
													...formData,
													password: e.target.value,
												})
											}
											required={!editingUser}
										/>
									</div>
									<div className="mb-3">
										<label className="form-label">Rôle *</label>
										<select
											className="form-select"
											value={formData.role}
											onChange={(e) =>
												setFormData({ ...formData, role: e.target.value })
											}
											required
										>
											<option value="viewer">Visiteur (Viewer)</option>
											<option value="editor">Éditeur (Editor)</option>
											<option value="admin">Administrateur (Admin)</option>
										</select>
									</div>
								</div>
								<div className="modal-footer">
									<button
										type="button"
										className="btn btn-secondary"
										onClick={() => setShowModal(false)}
									>
										Annuler
									</button>
									<button type="submit" className="btn btn-primary">
										{editingUser ? "Mettre à jour" : "Créer"}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
