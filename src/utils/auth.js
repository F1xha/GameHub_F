const USERS_KEY = 'gamehub_users';
const SESSION_KEY = 'gamehub_session';

function readUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
  catch { return []; }
}
function writeUsers(list) {
  try { localStorage.setItem(USERS_KEY, JSON.stringify(list)); } catch {}
}

export function getCurrentUser() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)); }
  catch { return null; }
}
export function isAuthenticated() {
  return !!getCurrentUser();
}
export function logout() {
  try { localStorage.removeItem(SESSION_KEY); } catch {}
}

export function registerUser({ name, email, password }) {
  const users = readUsers();
  const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (exists) return { ok: false, error: 'El correo ya está registrado' };
  const user = { id: Date.now().toString(), name, email, password }; // (plain para demo)
  users.push(user);
  writeUsers(users);
  // auto-login
  localStorage.setItem(SESSION_KEY, JSON.stringify({ id: user.id, name: user.name, email: user.email }));
  return { ok: true, user: { id: user.id, name: user.name, email: user.email } };
}

export function login({ email, password }) {
  const users = readUsers();
  const u = users.find(x => x.email.toLowerCase() === email.toLowerCase() && x.password === password);
  if (!u) return { ok: false, error: 'Credenciales inválidas' };
  localStorage.setItem(SESSION_KEY, JSON.stringify({ id: u.id, name: u.name, email: u.email }));
  return { ok: true, user: { id: u.id, name: u.name, email: u.email } };
}
