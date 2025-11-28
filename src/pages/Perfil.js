import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { useFavs } from '../utils/favs';
import { isAutenticado, getUsuario, login, registrar, logout } from '../utils/auth';
import '../styles/auth.css'; 

export default function Perfil() {
  // --- ESTADOS ---
  // Estado de autenticación: revisa si ya hay un usuario guardado en localStorage.
  const [auth, setAuth] = useState(() => ({ logged: isAutenticado(), usuario: getUsuario() }));
  const [errorAuth, setErrorAuth] = useState('');
  
  // Estados para controlar lo que escribe el usuario en los inputs.
  const [formLogin, setFormLogin] = useState({ email: '', password: '' });
  const [formRegistro, setFormRegistro] = useState({ nombre: '', email: '', password: '' });

  // Favoritos: traemos la lista de IDs del hook y preparamos estado para los datos completos.
  const { favs, isFav, toggleFav, clearFavs } = useFavs();
  const [datosFavoritos, setDatosFavoritos] = useState([]); // Aquí guardaremos los objetos completos de la API.
  const [cargandoFavs, setCargandoFavs] = useState(false);

  // 🔑 TU CLAVE DE API
  const API_KEY = "6a3bd592aa9449448bb1f9a8ef8fd02f";

  // --- EFECTO (Cargar Favoritos) ---
  useEffect(() => {
    const obtenerFavoritos = async () => {
      // Si la lista de IDs está vacía, no hay nada que buscar.
      if (favs.length === 0) {
        setDatosFavoritos([]);
        return;
      }

      setCargandoFavs(true);
      try {
        // TÉCNICA AVANZADA: Promise.all
        // Como tenemos varios IDs (ej: 345, 12, 99), necesitamos hacer un fetch por cada uno.
        // 'promesas' es un array de peticiones fetch que se inician simultáneamente.
        const promesas = favs.map(id => 
          fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`).then(res => {
            if(res.ok) return res.json();
            return null; // Si un juego falla individualmente, devolvemos null para no romper todo el proceso.
          })
        );

        // 'await Promise.all' espera a que TODAS las peticiones terminen antes de seguir.
        const resultados = await Promise.all(promesas);
        
        // Filtramos los 'null' (errores) y guardamos los juegos válidos.
        setDatosFavoritos(resultados.filter(juego => juego !== null));
        
      } catch (error) {
        console.error("Error cargando favoritos:", error);
      } finally {
        setCargandoFavs(false);
      }
    };

    // Solo ejecutamos esto si el usuario ha iniciado sesión.
    if (auth.logged) {
      obtenerFavoritos();
    }
  }, [favs, auth.logged]); // Se reactiva si cambia la lista de favoritos o el estado de login.


  // --- FUNCIONES DE FORMULARIOS ---

  const manejarLogin = (e) => {
    e.preventDefault(); // Evita que la página se recargue al enviar.
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
    setDatosFavoritos([]); // Es importante limpiar la vista al salir.
  };


  // --- VISTA: Si NO está autenticado, mostramos formularios ---
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

  // --- VISTA: Si SÍ está autenticado, mostramos perfil y favoritos ---
  return (
    <div>
      <h1>Mi Perfil</h1>
      <p><strong>Hola, {auth.usuario?.name}!</strong> ({auth.usuario?.email})</p>

      <div style={{display:'flex', gap:8, margin:'8px 0 16px'}}>
        <button onClick={manejarLogout} className="auth-btn" style={{background:'#1b1b1b'}}>Cerrar sesión</button>
      </div>

      <h2 style={{marginTop:12}}>Mis Favoritos (API)</h2>
      
      {/* Botón para borrar todos los favoritos (solo si hay alguno) */}
      {favs.length > 0 && (
        <div style={{marginBottom: 10}}>
            <button className="auth-btn" onClick={clearFavs} style={{background:'#1b1b1b', width:'auto'}}>
            Limpiar lista
            </button>
        </div>
      )}

      {/* Indicador de carga */}
      {cargandoFavs && <p>Cargando tus juegos favoritos desde la nube...</p>}

      {/* Mensaje si no tiene favoritos */}
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