import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { useFavs } from '../utils/favs';
import { isAutenticado, getUsuario, login, registrar, logout } from '../utils/auth';
import '../styles/auth.css'; 

export default function Perfil() {
  // Estado de autenticación (Usuario logueado o no)
  const [auth, setAuth] = useState(() => ({ logged: isAutenticado(), usuario: getUsuario() }));
  const [errorAuth, setErrorAuth] = useState('');
  
  // Estados para los formularios (Login y Registro)
  const [formLogin, setFormLogin] = useState({ email: '', password: '' });
  const [formRegistro, setFormRegistro] = useState({ nombre: '', email: '', password: '' });

  // Estado de Favoritos (Datos traídos de la API)
  const { favs, isFav, toggleFav, clearFavs } = useFavs();
  const [datosFavoritos, setDatosFavoritos] = useState([]);
  const [cargandoFavs, setCargandoFavs] = useState(false);

  // 🔑 TU CLAVE DE API
  const API_KEY = "6a3bd592aa9449448bb1f9a8ef8fd02f";

  // Efecto: Cargar detalles de cada juego favorito desde la API
  useEffect(() => {
    const obtenerFavoritos = async () => {
      // Si no hay favoritos guardados, limpiamos la lista y salimos
      if (favs.length === 0) {
        setDatosFavoritos([]);
        return;
      }

      setCargandoFavs(true);
      try {
        // Creamos una lista de promesas (una petición por cada juego favorito)
        const promesas = favs.map(id => 
          fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`).then(res => {
            if(res.ok) return res.json();
            return null; // Si un juego falla, devolvemos null para no romper todo
          })
        );

        // Esperamos a que TODAS las peticiones a la API terminen
        const resultados = await Promise.all(promesas);
        
        // Filtramos los resultados nulos (por si hubo errores) y guardamos
        setDatosFavoritos(resultados.filter(juego => juego !== null));
        
      } catch (error) {
        console.error("Error cargando favoritos:", error);
      } finally {
        setCargandoFavs(false);
      }
    };

    // Solo intentamos cargar si el usuario está logueado
    if (auth.logged) {
      obtenerFavoritos();
    }
  }, [favs, auth.logged]); // Se ejecuta si cambian los favoritos o el estado de login


  // --- Manejadores de Eventos (Login, Registro, Salir) ---

  const manejarLogin = (e) => {
    e.preventDefault();
    const respuesta = login({ email: formLogin.email, password: formLogin.password });
    if (!respuesta.ok) return setErrorAuth(respuesta.error);
    
    setErrorAuth('');
    setAuth({ logged: true, usuario: respuesta.user });
  };

  const manejarRegistro = (e) => {
    e.preventDefault();
    if (!formRegistro.nombre.trim()) return setErrorAuth('Ingresa tu nombre');
    
    const respuesta = registrar({ 
      nombre: formRegistro.nombre, 
      email: formRegistro.email, 
      password: formRegistro.password 
    });
    
    if (!respuesta.ok) return setErrorAuth(respuesta.error);
    
    setErrorAuth('');
    setAuth({ logged: true, usuario: respuesta.user });
  };

  const manejarLogout = () => {
    logout();
    setAuth({ logged: false, usuario: null });
    setDatosFavoritos([]); // Limpiamos la vista al cerrar sesión
  };


  // --- VISTA: Usuario NO Autenticado ---
  if (!auth.logged) {
    return (
      <div>
        <h1>Mi Perfil</h1>
        <p>Inicia sesión para ver tus juegos guardados de la API.</p>
        {errorAuth && <div className="auth-error">{errorAuth}</div>}

        <div className="auth-simple">
          {/* Formulario de Login */}
          <form onSubmit={manejarLogin} className="auth-box">
            <h2 style={{marginTop:0}}>Iniciar Sesión</h2>
            <input 
              className="auth-input" 
              placeholder="Correo electrónico" 
              type="email" 
              value={formLogin.email} 
              onChange={e=>setFormLogin({...formLogin, email: e.target.value})} 
              required 
            />
            <input 
              className="auth-input" 
              placeholder="Contraseña" 
              type="password" 
              value={formLogin.password} 
              onChange={e=>setFormLogin({...formLogin, password: e.target.value})} 
              required 
            />
            <button className="auth-btn" type="submit">Entrar</button>
          </form>

          {/* Formulario de Registro */}
          <form onSubmit={manejarRegistro} className="auth-box">
            <h2 style={{marginTop:0}}>Registrarse</h2>
            <input 
              className="auth-input" 
              placeholder="Nombre" 
              type="text" 
              value={formRegistro.nombre} 
              onChange={e=>setFormRegistro({...formRegistro, nombre: e.target.value})} 
              required 
            />
            <input 
              className="auth-input" 
              placeholder="Correo electrónico" 
              type="email" 
              value={formRegistro.email} 
              onChange={e=>setFormRegistro({...formRegistro, email: e.target.value})} 
              required 
            />
            <input 
              className="auth-input" 
              placeholder="Contraseña" 
              type="password" 
              value={formRegistro.password} 
              onChange={e=>setFormRegistro({...formRegistro, password: e.target.value})} 
              required 
            />
            <button className="auth-btn" type="submit">Crear cuenta</button>
          </form>
        </div>
      </div>
    );
  }

  // --- VISTA: Usuario Autenticado ---
  return (
    <div>
      <h1>Mi Perfil</h1>
      <p><strong>Hola, {auth.usuario?.name}!</strong> ({auth.usuario?.email})</p>

      <div style={{display:'flex', gap:8, margin:'8px 0 16px'}}>
        <button onClick={manejarLogout} className="auth-btn" style={{background:'#1b1b1b'}}>Cerrar sesión</button>
      </div>

      <h2 style={{marginTop:12}}>Mis Favoritos (API)</h2>
      
      {/* Botón para limpiar favoritos */}
      {favs.length > 0 && (
        <div style={{marginBottom: 10}}>
            <button className="auth-btn" onClick={clearFavs} style={{background:'#1b1b1b', width:'auto'}}>
            Limpiar lista
            </button>
        </div>
      )}

      {/* Indicador de carga */}
      {cargandoFavs && <p>Cargando tus juegos favoritos desde la nube...</p>}

      {/* Mensaje de lista vacía */}
      {!cargandoFavs && datosFavoritos.length === 0 && (
        <p style={{marginTop:12}}>
          No tienes favoritos guardados. Ve al <Link to="/catalogo" style={{color:'#00bfff'}}>catálogo</Link> para agregar algunos.
        </p>
      )}

      {/* Grilla de Juegos Favoritos */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))', gap:20, marginTop:20 }}>
        {datosFavoritos.map(juego => (
            <Link key={juego.id} to={`/juego/${juego.id}`} style={{ textDecoration:'none', color:'inherit' }}>
              <Card
                title={juego.name}
                image={juego.background_image}
                fav={isFav(juego.id)}
                onToggleFav={() => toggleFav(juego.id)}
              >
                <p>{juego.genres?.map(g=>g.name).slice(0,2).join(', ')} | ⭐ {juego.rating}</p>
              </Card>
            </Link>
        ))}
      </div>
    </div>
  );
}