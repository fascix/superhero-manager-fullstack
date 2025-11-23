// frontend/src/utils/stringUtils.ts
// Fonction pour normaliser les caractères (ignore tirets, accents, etc.)
export const normalizeString = (str: string): string => {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/[-_\s]/g, ''); // Supprime tirets, underscores et espaces
};
