import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
	userId: string;
	username: string;
	role: string;
}

declare global {
	namespace Express {
		interface Request {
			user?: JwtPayload;
		}
	}
}

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	try {
		const token = req.headers.authorization?.split(" ")[1]; // "Bearer TOKEN"

		if (!token) {
			res.status(401).json({ message: "Token manquant, accès refusé" });
			return;
		}

		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET as string
		) as JwtPayload;
		req.user = decoded;
		next();
	} catch (error) {
		res.status(401).json({ message: "Token invalide ou expiré" });
	}
};

export const adminMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	if (req.user?.role !== "admin") {
		res
			.status(403)
			.json({ message: "Accès refusé, rôle administrateur requis" });
		return;
	}
	next();
};
