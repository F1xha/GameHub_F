import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavs } from '../utils/favs';
import juegos from '../data/juegos';
import Card from '../components/Card';
import { isAuthenticated, getCurrentUser, login, registerUser, logout } from '../utils/auth';

export default function Perfil(){
  const [auth, setAuth] = useState(() => ({ logged: isAuthenticated(), user: getCurrentUser() }));
  const { favs, toggleFav, clearFavs, isFav } = useFavs();

  const favoritos = useMemo(() => juegos.filter(j => favs.includes(j.id)), [favs]);

  const [formLogin, setFormLogin] = useState({ email: '', password: '' });
  const [formReg, setFormReg] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const res = login(formLogin);
    if (!res.ok) return setError(res.error);
    setError('');
    setAuth({ logged: true, user: res.user });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!formReg.name.trim()) return setError('Ingresa tu nombre');
    const res = registerUser(formReg);
    if (!res.ok) return setError(res.error);
    setError('');
    setAuth({ logged: true, user: res.user });
  };

  const handleLogout = () => {
    logout();
    setAuth({ logged: false, user: null });
  };

  if (!auth.logged) {
    return (
      <div>
        <h1>Mi Perfil</h1>
        <p>Inicia sesión o regístrate para guardar y ver tus favoritos.</p>
        {error && <p style={{color:'#ff6666'}} data-testid="auth-error">{error}</p>}

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:24}}>
          {/* Login */}
          <form onSubmit={handleLogin} data-testid="form-login" style={{background:'#1b1b1b', padding:16, borderRadius:12, border:'1px solid #333'}}>
            <h2>Iniciar Sesión</h2>
            <label>Email</label>
            <input
              data-testid="login-email"
              type="email"
              value={formLogin.email}
              onChange={e=>setFormLogin({...formLogin, email: e.target.value})}
              required
              style={{width:'100%', marginBottom:10}}
            />
            <label>Contraseña</label>
            <input
              data-testid="login-password"
              type="password"
              value={formLogin.password}
              onChange={e=>setFormLogin({...formLogin, password: e.target.value})}
              required
              style={{width:'100%', marginBottom:10}}
            />
            <button data-testid="login-submit" type="submit" style={{background:'#00bfff', color:'#fff', border:'none', padding:'8px 12px', borderRadius:8, cursor:'pointer'}}>Entrar</button>
          </form>

          {/* Registro */}
          <form onSubmit={handleRegister} data-testid="form-register" style={{background:'#1b1b1b', padding:16, borderRadius:12, border:'1px solid #333'}}>
            <h2>Registrarse</h2>
            <label>Nombre</label>
            <input
              data-testid="reg-name"
              type="text"
              value={formReg.name}
              onChange={e=>setFormReg({...formReg, name: e.target.value})}
              required
              style={{width:'100%', marginBottom:10}}
            />
            <label>Email</label>
            <input
              data-testid="reg-email"
              type="email"
              value={formReg.email}
              onChange={e=>setFormReg({...formReg, email: e.target.value})}
              required
              style={{width:'100%', marginBottom:10}}
            />
            <label>Contraseña</label>
            <input
              data-testid="reg-password"
              type="password"
              value={formReg.password}
              onChange={e=>setFormReg({...formReg, password: e.target.value})}
              required
              style={{width:'100%', marginBottom:10}}
            />
            <button data-testid="reg-submit" type="submit" style={{background:'#00bfff', color:'#fff', border:'none', padding:'8px 12px', borderRadius:8, cursor:'pointer'}}>Crear cuenta</button>
          </form>
        </div>
      </div>
    );
  }

  // Vista autenticado
  return (
    <div>
      <h1>Mi Perfil</h1>
      <p><strong>Nombre:</strong> {auth.user?.name}</p>
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
