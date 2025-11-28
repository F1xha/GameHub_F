import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { useFavs } from '../utils/favs';
import { isAutenticado, getUsuario, login, registrar, logout } from '../utils/auth';
import '../styles/auth.css'; 

export default function Perfil() {
  // Auth state
  const [auth, setAuth] = useState(() => ({ logged: isAutenticado(), user: getUsuario() }));
  const [errorAuth, setErrorAuth] = useState('');
  
  // Forms state
  const [formLogin, setFormLogin] = useState({ email: '', password: '' });
  const [formReg, setFormReg] = useState({ nombre: '', email: '', password: '' });

  // Favorites state (API Data)
  const { favs, isFav, toggleFav, clearFavs } = useFavs();
  const [favoritosData, setFavoritosData] = useState([]);
  const [loadingFavs, setLoadingFavs] = useState(false);

  // 🔑 REEMPLAZA ESTO CON TU CLAVE DE RAWG
  const API_KEY = "6a3bd592aa9449448bb1f9a8ef8fd02f";

  // Efecto para cargar los detalles de los juegos favoritos desde la API
  useEffect(() => {
    const fetchFavoritos = async () => {
      if (favs.length === 0) {
        setFavoritosData([]);
        return;
      }

      setLoadingFavs(true);
      try {
        // Creamos un array de promesas (una petición por cada ID en favoritos)
        const promesas = favs.map(id => 
          fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`).then(res => {
            if(res.ok) return res.json();
            return null; // Si un juego falla, devolvemos null para no romper todo
          })
        );

        // Esperamos a que TODAS las peticiones terminen
        const resultados = await Promise.all(promesas);
        
        // Filtramos los nulos (por si algún ID viejo dio error)
        setFavoritosData(resultados.filter(j => j !== null));
        
      } catch (error) {
        console.error("Error cargando favoritos:", error);
      } finally {
        setLoadingFavs(false);
      }
    };

    if (auth.logged) {
      fetchFavoritos();
    }
  }, [favs, auth.logged]); // Se ejecuta si cambian los favoritos o el estado de login


  // Lógica de Autenticación (Igual que antes)
  const handleLogin = (e) => {
    e.preventDefault();
    const res = login({ email: formLogin.email, password: formLogin.password });
    if (!res.ok) return setErrorAuth(res.error);
    setErrorAuth('');
    setAuth({ logged: true, user: res.user });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!formReg.nombre.trim()) return setErrorAuth('Ingresa tu nombre');
    const res = registrar({ nombre: formReg.nombre, email: formReg.email, password: formReg.password });
    if (!res.ok) return setErrorAuth(res.error);
    setErrorAuth('');
    setAuth({ logged: true, user: res.user });
  };

  const handleLogout = () => {
    logout();
    setAuth({ logged: false, user: null });
    setFavoritosData([]); // Limpiamos la vista de favoritos al salir
  };


  // Vista NO Autenticado
  if (!auth.logged) {
    return (
      <div>
        <h1>Mi Perfil</h1>
        <p>Inicia sesión para ver tus juegos guardados de la API.</p>
        {errorAuth && <div className="auth-error">{errorAuth}</div>}

        <div className="auth-simple">
          <form onSubmit={handleLogin} className="auth-box">
            <h2 style={{marginTop:0}}>Iniciar Sesión</h2>
            <input className="auth-input" placeholder="Correo" type="email" value={formLogin.email} onChange={e=>setFormLogin({...formLogin, email: e.target.value})} required />
            <input className="auth-input" placeholder="Contraseña" type="password" value={formLogin.password} onChange={e=>setFormLogin({...formLogin, password: e.target.value})} required />
            <button className="auth-btn" type="submit">Entrar</button>
          </form>

          <form onSubmit={handleRegister} className="auth-box">
            <h2 style={{marginTop:0}}>Registrarse</h2>
            <input className="auth-input" placeholder="Nombre" type="text" value={formReg.nombre} onChange={e=>setFormReg({...formReg, nombre: e.target.value})} required />
            <input className="auth-input" placeholder="Correo" type="email" value={formReg.email} onChange={e=>setFormReg({...formReg, email: e.target.value})} required />
            <input className="auth-input" placeholder="Contraseña" type="password" value={formReg.password} onChange={e=>setFormReg({...formReg, password: e.target.value})} required />
            <button className="auth-btn" type="submit">Crear cuenta</button>
          </form>
        </div>
      </div>
    );
  }

  // Vista Autenticado
  return (
    <div>
      <h1>Mi Perfil</h1>
      <p><strong>Hola, {auth.user?.name}!</strong> ({auth.user?.email})</p>

      <div style={{display:'flex', gap:8, margin:'8px 0 16px'}}>
        <button onClick={handleLogout} className="auth-btn" style={{background:'#1b1b1b'}}>Cerrar sesión</button>
      </div>

      <h2 style={{marginTop:12}}>Mis Favoritos (API)</h2>
      
      {/* Controles de favoritos */}
      {favs.length > 0 && (
        <div style={{marginBottom: 10}}>
            <button className="auth-btn" onClick={clearFavs} style={{background:'#1b1b1b', width:'auto'}}>
            Limpiar lista
            </button>
        </div>
      )}

      {/* Estado de carga */}
      {loadingFavs && <p>Cargando tus juegos favoritos desde la nube...</p>}

      {/* Lista vacía */}
      {!loadingFavs && favoritosData.length === 0 && (
        <p style={{marginTop:12}}>
          No tienes favoritos guardados. Ve al <Link to="/catalogo" style={{color:'#00bfff'}}>catálogo</Link>.
        </p>
      )}

      {/* Grid de favoritos */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))', gap:20, marginTop:20 }}>
        {favoritosData.map(j => (
            <Link key={j.id} to={`/juego/${j.id}`} style={{ textDecoration:'none', color:'inherit' }}>
              <Card
                title={j.name}
                image={j.background_image}
                fav={isFav(j.id)}
                onToggleFav={() => toggleFav(j.id)}
              >
                <p>{j.genres?.map(g=>g.name).slice(0,2).join(', ')} | ⭐ {j.rating}</p>
              </Card>
            </Link>
        ))}
      </div>
    </div>
  );
}