import fs from "fs";
import path from "path";

// Types de logs
export enum LogLevel {
	INFO = "INFO",
	WARNING = "WARNING",
	ERROR = "ERROR",
	SUCCESS = "SUCCESS",
}

// Interface pour les logs
interface LogEntry {
	timestamp: string;
	level: LogLevel;
	message: string;
	details?: any;
}

// Répertoire des logs
const LOGS_DIR = path.join(__dirname, "../../logs");

// Créer le répertoire logs s'il n'existe pas
if (!fs.existsSync(LOGS_DIR)) {
	fs.mkdirSync(LOGS_DIR, { recursive: true });
}

// Fonction pour formater la date
const formatDate = (): string => {
	const now = new Date();
	return now.toISOString();
};

// Fonction pour obtenir le nom du fichier log du jour
const getLogFilePath = (): string => {
	const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
	return path.join(LOGS_DIR, `app-${today}.log`);
};

// Fonction principale de logging
export const log = (level: LogLevel, message: string, details?: any): void => {
	const logEntry: LogEntry = {
		timestamp: formatDate(),
		level,
		message,
		details: details || undefined,
	};

	// Format du log pour le fichier
	const logString = `[${logEntry.timestamp}] [${logEntry.level}] ${
		logEntry.message
	}${
		logEntry.details
			? `\nDetails: ${JSON.stringify(logEntry.details, null, 2)}`
			: ""
	}\n${"=".repeat(80)}\n`;

	// Écrire dans le fichier
	try {
		fs.appendFileSync(getLogFilePath(), logString, "utf-8");
	} catch (error) {
		console.error("❌ Erreur lors de l'écriture du log:", error);
	}

	// Afficher aussi dans la console avec couleur
	const colors: { [key in LogLevel]: string } = {
		[LogLevel.INFO]: "\x1b[36m", // Cyan
		[LogLevel.WARNING]: "\x1b[33m", // Jaune
		[LogLevel.ERROR]: "\x1b[31m", // Rouge
		[LogLevel.SUCCESS]: "\x1b[32m", // Vert
	};
	const reset = "\x1b[0m";

	console.log(`${colors[level]}[${level}]${reset} ${message}`);
	if (details) {
		console.log("Details:", details);
	}
};

// Fonctions utilitaires
export const logInfo = (message: string, details?: any) =>
	log(LogLevel.INFO, message, details);
export const logWarning = (message: string, details?: any) =>
	log(LogLevel.WARNING, message, details);
export const logError = (message: string, details?: any) =>
	log(LogLevel.ERROR, message, details);
export const logSuccess = (message: string, details?: any) =>
	log(LogLevel.SUCCESS, message, details);

// Fonction pour lire les logs d'une date spécifique
export const readLogs = (date?: string): string => {
	const targetDate = date || new Date().toISOString().split("T")[0];
	const logFilePath = path.join(LOGS_DIR, `app-${targetDate}.log`);

	try {
		if (fs.existsSync(logFilePath)) {
			return fs.readFileSync(logFilePath, "utf-8");
		} else {
			return `Aucun log trouvé pour la date: ${targetDate}`;
		}
	} catch (error) {
		return `Erreur lors de la lecture des logs: ${error}`;
	}
};

// Fonction pour obtenir tous les fichiers de logs disponibles
export const getAvailableLogFiles = (): string[] => {
	try {
		const files = fs.readdirSync(LOGS_DIR);
		return files
			.filter((file) => file.endsWith(".log"))
			.sort()
			.reverse();
	} catch (error) {
		console.error(
			"Erreur lors de la récupération des fichiers de logs:",
			error
		);
		return [];
	}
};
