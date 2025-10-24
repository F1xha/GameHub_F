// src/utils/auth.js
// ============================================================
// SISTEMA DE AUTENTICACIÓN LOCAL (login/registro/logout)
// Guarda todo en localStorage (sin backend). DEMO EDUCATIVA.
// ============================================================

const USERS_KEY = 'usuarios';
const SESSION_KEY = 'usuario';

function readJSON(key, fallback) {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
  catch { return fallback; }
}
function writeJSON(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

// API principal (inglés)
export function getCurrentUser() { return readJSON(SESSION_KEY, null); }
export function isAuthenticated() { return !!getCurrentUser(); }

export function registerUser({ name, email, password }) {
  const usuarios = readJSON(USERS_KEY, []);
  const existe = usuarios.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (existe) return { ok: false, error: 'El correo ya está registrado' };

  const user = { id: Date.now().toString(), name, email, password };
  usuarios.push(user);
  writeJSON(USERS_KEY, usuarios);

  writeJSON(SESSION_KEY, { id: user.id, name: user.name, email: user.email });
  return { ok: true, user: { id: user.id, name: user.name, email: user.email } };
}

export function login({ email, password }) {
  const usuarios = readJSON(USERS_KEY, []);
  const u = usuarios.find(x => x.email.toLowerCase() === email.toLowerCase() && x.password === password);
  if (!u) return { ok: false, error: 'Credenciales inválidas' };
  writeJSON(SESSION_KEY, { id: u.id, name: u.name, email: u.email });
  return { ok: true, user: { id: u.id, name: u.name, email: u.email } };
}

export function logout() { try { localStorage.removeItem(SESSION_KEY); } catch {} return { ok: true }; }

// Aliases en español (compatibilidad con Perfil.js)
export const isAutenticado = isAuthenticated;
export const getUsuario = getCurrentUser;
export const registrar = ({ nombre, email, password }) => registerUser({ name: nombre, email, password });
