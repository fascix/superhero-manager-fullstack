import API from './heroApi.ts';

export const register = (username: string, password: string, role: string) =>
  API.post('/auth/register', { username, password, role });

export const login = (username: string, password: string) =>
  API.post('/auth/login', { username, password });

export const verifyToken = () => API.get('/auth/verify');