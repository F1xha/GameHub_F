// src/pages/Perfil.js
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import juegos from '../data/juegos';
import { useFavs } from '../utils/favs';
import '../styles/auth.css';
import { isAuthenticated as isAutenticado, getCurrentUser as getUsuario, login, registerUser as registrar, logout } from '../utils/auth';

export default function Perfil(){
  // estado de auth muy simple
  const [auth, setAuth] = useState(() => ({ logged: isAutenticado(), user: getUsuario() }));
  const [error, setError] = useState('');

  // forms controlados mínimos
  const [formLogin, setFormLogin] = useState({ email: '', password: '' });
  const [formReg, setFormReg] = useState({ nombre: '', email: '', password: '' });

  const { favs, isFav, toggleFav, clearFavs } = useFavs();
  const favoritos = useMemo(() => juegos.filter(j => favs.includes(j.id)), [favs]);

  const handleLogin = (e) => {
    e.preventDefault();
    const res = login(formLogin.email, formLogin.password);
    if (!res.ok) return setError(res.error);
    setError('');
    setAuth({ logged: true, user: res.user });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!formReg.nombre.trim()) return setError('Ingresa tu nombre');
    const res = registrar(formReg.nombre, formReg.email, formReg.password);
    if (!res.ok) return setError(res.error);
    setError('');
    setAuth({ logged: true, user: res.user });
  };

  const handleLogout = () => {
    logout();
    setAuth({ logged: false, user: null });
  };

  // Vista no autenticado: login + registro
  if (!auth.logged) {
    return (
<div>
  <h1>Mi Perfil</h1>
  <p>Inicia sesión o regístrate. (Se guarda en tu navegador con localStorage)</p>
  {error && <div className="auth-error" data-testid="auth-error">{error}</div>}

  <div className="auth-simple">
    {/* Login */}
    <form onSubmit={handleLogin} data-testid="form-login" className="auth-box">
      <h2 style={{marginTop:0}}>Iniciar Sesión</h2>
      <input
        className="auth-input"
        placeholder="Correo electrónico"
        data-testid="login-email"
        type="email"
        value={formLogin.email}
        onChange={e=>setFormLogin({...formLogin, email: e.target.value})}
        required
      />
      <input
        className="auth-input"
        placeholder="Contraseña"
        data-testid="login-password"
        type="password"
        value={formLogin.password}
        onChange={e=>setFormLogin({...formLogin, password: e.target.value})}
        required
      />
      <button className="auth-btn" data-testid="login-submit" type="submit">Entrar</button>
    </form>

    {/* Registro */}
    <form onSubmit={handleRegister} data-testid="form-register" className="auth-box">
      <h2 style={{marginTop:0}}>Registrarse</h2>
      <input
        className="auth-input"
        placeholder="Nombre"
        data-testid="reg-nombre"
        type="text"
        value={formReg.nombre}
        onChange={e=>setFormReg({...formReg, nombre: e.target.value})}
        required
      />
      <input
        className="auth-input"
        placeholder="Correo electrónico"
        data-testid="reg-email"
        type="email"
        value={formReg.email}
        onChange={e=>setFormReg({...formReg, email: e.target.value})}
        required
      />
      <input
        className="auth-input"
        placeholder="Contraseña"
        data-testid="reg-password"
        type="password"
        value={formReg.password}
        onChange={e=>setFormReg({...formReg, password: e.target.value})}
        required
      />
      <button className="auth-btn" data-testid="reg-submit" type="submit">Crear cuenta</button>
    </form>
  </div>
</div>

    );
  }

  // Vista autenticado: datos y favoritos
  return (
    <div>
      <h1>Mi Perfil</h1>
      <p><strong>Nombre:</strong> {auth.user?.nombre}</p>
      <p><strong>Email:</strong> {auth.user?.email}</p>
      <button onClick={handleLogout} data-testid="logout-btn" style={{background:'#1b1b1b', color:'#fff', border:'1px solid #333', padding:'6px 10px', borderRadius:8, cursor:'pointer'}}>Cerrar sesión</button>

      <h2 style={{marginTop:24}}>Favoritos</h2>
      <p><strong>Total:</strong> {favs.length}</p>
      {favs.length > 0 && (
        <button
          style={{background:'#1b1b1b', color:'#fff', border:'1px solid #333', padding:'6px 10px', borderRadius:8, cursor:'pointer'}}
          onClick={clearFavs}
          data-testid="clear-favs"
        >
          Limpiar todos
        </button>
      )}

      {favoritos.length === 0 ? (
        <p style={{marginTop:12}}>
          Aún no tienes favoritos. Ve al <Link to="/catalogo" style={{color:'#00bfff'}}>catálogo</Link> para agregar.
        </p>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))', gap:20, marginTop:20 }}>
          {favoritos.map(j => (
            <Link key={j.id} to={`/juego/${j.id}`} style={{ textDecoration:'none', color:'inherit' }}>
              <Card
                title={j.title}
                image={j.images.cover}
                fav={isFav(j.id)}
                onToggleFav={() => toggleFav(j.id)}
              >
                <p>{j.genre.join(', ')} | ⭐ {j.rating}</p>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
