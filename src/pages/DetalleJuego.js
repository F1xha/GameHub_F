import React, { useEffect, useState } from 'react';
// useParams: para leer el ID de la URL (ej: /juego/3498 -> id = 3498).
// Link: para crear enlaces internos (volver al catálogo).
import { useParams, Link } from 'react-router-dom';
import { useFavs } from '../utils/favs';

export default function DetalleJuego(){
  // Obtenemos el 'id' de la barra de direcciones.
  const { id } = useParams();
  
  // --- ESTADOS ---
  // 'juego': Objeto que tendrá todos los detalles del juego. Empieza null.
  const [juego, setJuego] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isFav, toggleFav } = useFavs();

  // 🔑 TU CLAVE DE API
  const API_KEY = "TU_API_KEY_AQUI";

  // --- EFECTO (Carga del juego específico) ---
  // Se ejecuta cuando cambia el 'id' (por ejemplo, si navegamos de un juego a otro).
  useEffect(() => {
    const fetchDetalle = async () => {
      setLoading(true);
      try {
        // Hacemos fetch a la URL específica de detalles de un juego en RAWG.
        const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        
        if (!response.ok) {
          throw new Error('No se pudo encontrar el juego');
        }

        const data = await response.json();
        setJuego(data); // Guardamos el objeto del juego completo.

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetalle();
  }, [id]);

  // --- RENDERIZADO CONDICIONAL ---

  if (loading) return <div style={{color:'white', padding:20, textAlign:'center'}}><h2>Cargando detalles...</h2></div>;
  
  if (error) return (
    <div style={{color:'#ff7676', padding:20, textAlign:'center'}}>
      <p>Error: {error}</p>
      <Link to="/catalogo" style={{color:'#00bfff'}}>Volver al catálogo</Link>
    </div>
  );

  // Si no hay carga ni error pero tampoco juego (caso raro), no mostramos nada.
  if (!juego) return null;

  // Verificamos si es favorito para pintar el corazón correcto.
  const fav = isFav(juego.id);

  return (
    <div>
      {/* Enlace para regresar */}
      <Link to="/catalogo" style={{color:'#00bfff'}}>← Volver al catálogo</Link>

      {/* Cabecera con título, imagen grande y botón de favorito */}
      <header style={{textAlign:'center', margin:'12px 0 24px'}}>
        <h1>{juego.name}</h1>
        <img src={juego.background_image} alt={juego.name} style={{ width:'70%', maxWidth:900, borderRadius:10 }}/>
        
        <div style={{marginTop:12}}>
          <button
            className="fav-btn"
            onClick={() => toggleFav(juego.id)}
            style={{background:'#1b1b1b', color:'#fff', border:'1px solid #333', padding:'6px 10px', borderRadius:8, cursor:'pointer'}}
          >
            {fav ? '❤️ Quitar de favoritos' : '🤍 Agregar a favoritos'}
          </button>
        </div>
      </header>

      {/* Sección de contenido dividida en 2 columnas */}
      <section style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:24}}>
        
        {/* Columna Izquierda: Descripción */}
        <div>
          <h2>Descripción</h2>
          {/* description_raw es el texto plano de la descripción que nos da la API */}
          {/* whiteSpace: 'pre-wrap' respeta los saltos de línea que vengan en el texto */}
          <p style={{lineHeight: 1.6, whiteSpace: 'pre-wrap'}}>{juego.description_raw || "Sin descripción disponible."}</p>
        </div>

        {/* Columna Derecha: Ficha técnica detallada */}
        <aside style={{background: '#111', padding: 20, borderRadius: 10, height: 'fit-content'}}>
          <h2>Ficha Técnica</h2>
          <ul style={{lineHeight:1.8, listStyle:'none', padding:0}}>
            <li><strong>Lanzamiento:</strong> {juego.released}</li>
            <li><strong>Desarrolladores:</strong> {juego.developers?.map(d => d.name).join(', ')}</li>
            <li><strong>Géneros:</strong> {juego.genres?.map(g => g.name).join(', ')}</li>
            <li><strong>Plataformas:</strong> {juego.platforms?.map(p => p.platform.name).join(', ')}</li>
            <li><strong>Metascore:</strong> {juego.metacritic || 'N/A'}</li>
            <li><strong>Rating:</strong> {juego.rating} / 5</li>
            
            {/* Solo mostramos el enlace si la API nos devuelve uno */}
            {juego.website && (
               <li><strong>Web oficial:</strong> <a href={juego.website} target="_blank" rel="noreferrer" style={{color:'#00bfff'}}>Visitar</a></li>
            )}
          </ul>
        </aside>
      </section>
    </div>
  );
}