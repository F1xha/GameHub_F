// src/utils/auth.js
// ============================================================
// SISTEMA DE AUTENTICACIÓN LOCAL
// ------------------------------------------------------------
// Este archivo maneja el registro, inicio de sesión y cierre
// de sesión del usuario usando localStorage del navegador.
// No usa backend ni base de datos: todo se guarda localmente.
// ============================================================


// === Claves usadas en localStorage ===
const USERS_KEY = 'usuarios';   // Lista de usuarios registrados
const SESSION_KEY = 'usuario';  // Usuario actualmente logueado


// === Funciones auxiliares ===
// Estas dos funciones se usan para leer/escribir JSON en localStorage

// Lee un valor JSON guardado en localStorage.
// Si no existe o hay error, devuelve el valor por defecto (fallback).
function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);  // Obtiene el valor guardado
    return raw ? JSON.parse(raw) : fallback; // Convierte a objeto JSON
  } catch {
    return fallback; // Si falla el parseo, devuelve el valor por defecto
  }
}

// Guarda un valor JSON en localStorage (en forma de texto).
function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Si hay error (por ejemplo, almacenamiento lleno), se ignora.
  }
}


// === API principal (en inglés) ===
// Estas funciones son las "oficiales", las que hacen el trabajo real.

// Devuelve el usuario actualmente logueado, o null si no hay sesión activa.
export function getCurrentUser() {
  return readJSON(SESSION_KEY, null);
}

// Indica si hay sesión activa (true o false).
export function isAuthenticated() {
  return !!getCurrentUser();
}

// Registra un nuevo usuario (nombre, email, contraseña).
// Si el correo ya existe, devuelve un error.
// Si todo va bien, guarda el usuario y lo inicia automáticamente.
export function registerUser({ name, email, password }) {
  const usuarios = readJSON(USERS_KEY, []);  // Lista actual de usuarios
  const existe = usuarios.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (existe) return { ok: false, error: 'El correo ya está registrado' };

  // Crea el nuevo usuario
  const user = { id: Date.now().toString(), name, email, password };
  usuarios.push(user);                      // Lo agrega a la lista
  writeJSON(USERS_KEY, usuarios);           // Guarda la lista actualizada

  // Guarda el usuario como "sesión activa"
  writeJSON(SESSION_KEY, { id: user.id, name: user.name, email: user.email });

  // Devuelve éxito
  return { ok: true, user: { id: user.id, name: user.name, email: user.email } };
}

// Inicia sesión comprobando las credenciales.
// Si coinciden email y password, guarda al usuario como sesión activa.
export function login({ email, password }) {
  const usuarios = readJSON(USERS_KEY, []);
  const u = usuarios.find(x =>
    x.email.toLowerCase() === email.toLowerCase() && x.password === password
  );

  // Si no existe, devuelve error
  if (!u) return { ok: false, error: 'Credenciales inválidas' };

  // Si coincide, guarda el usuario en la sesión
  writeJSON(SESSION_KEY, { id: u.id, name: u.name, email: u.email });
  return { ok: true, user: { id: u.id, name: u.name, email: u.email } };
}

// Cierra la sesión del usuario actual
export function logout() {
  try { localStorage.removeItem(SESSION_KEY); } catch {}
  return { ok: true };
}


// === Alias en español (para compatibilidad con Perfil.js) ===
// ------------------------------------------------------------
// En Perfil.js se usaban funciones con nombres en español.
// Aquí las "traducimos" sin duplicar la lógica.

export const isAutenticado = isAuthenticated; // = isAuthenticated()
export const getUsuario = getCurrentUser;     // = getCurrentUser()
export const registrar = ({ nombre, email, password }) =>
  registerUser({ name: nombre, email, password });
// Así puedes usar registrar({ nombre, email, password }) sin problemas.
