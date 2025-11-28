import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFavs } from '../utils/favs';

export default function DetalleJuego(){
  const { id } = useParams();
  
  // Estados
  const [juego, setJuego] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isFav, toggleFav } = useFavs();

  // 🔑 REEMPLAZA ESTO CON TU CLAVE DE RAWG
  const API_KEY = "6a3bd592aa9449448bb1f9a8ef8fd02f";

  useEffect(() => {
    const fetchDetalle = async () => {
      setLoading(true);
      try {
        // Petición al endpoint de detalles de RAWG
        const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        
        if (!response.ok) {
          throw new Error('No se pudo encontrar el juego');
        }

        const data = await response.json();
        setJuego(data);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetalle();
  }, [id]);

  // Renderizado condicional según el estado
  if (loading) return <div style={{color:'white', padding:20, textAlign:'center'}}><h2>Cargando detalles...</h2></div>;
  
  if (error) return (
    <div style={{color:'#ff7676', padding:20, textAlign:'center'}}>
      <p>Error: {error}</p>
      <Link to="/catalogo" style={{color:'#00bfff'}}>Volver al catálogo</Link>
    </div>
  );

  if (!juego) return null;

  const fav = isFav(juego.id);

  return (
    <div>
      <Link to="/catalogo" style={{color:'#00bfff'}}>← Volver al catálogo</Link>

      {/* Cabecera */}
      <header style={{textAlign:'center', margin:'12px 0 24px'}}>
        <h1>{juego.name}</h1>
        {/* background_image es la imagen principal en RAWG */}
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

      {/* Descripción y Ficha Técnica */}
      <section style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:24}}>
        {/* Columna izquierda */}
        <div>
          <h2>Descripción</h2>
          {/* description_raw viene sin etiquetas HTML */}
          <p style={{lineHeight: 1.6, whiteSpace: 'pre-wrap'}}>{juego.description_raw || "Sin descripción disponible."}</p>
        </div>

        {/* Columna derecha (Ficha adaptada a datos reales) */}
        <aside style={{background: '#111', padding: 20, borderRadius: 10, height: 'fit-content'}}>
          <h2>Ficha Técnica</h2>
          <ul style={{lineHeight:1.8, listStyle:'none', padding:0}}>
            <li><strong>Lanzamiento:</strong> {juego.released}</li>
            <li><strong>Desarrolladores:</strong> {juego.developers?.map(d => d.name).join(', ')}</li>
            <li><strong>Géneros:</strong> {juego.genres?.map(g => g.name).join(', ')}</li>
            <li><strong>Plataformas:</strong> {juego.platforms?.map(p => p.platform.name).join(', ')}</li>
            <li><strong>Metascore:</strong> {juego.metacritic || 'N/A'}</li>
            <li><strong>Rating:</strong> {juego.rating} / 5</li>
            {juego.website && (
               <li><strong>Web oficial:</strong> <a href={juego.website} target="_blank" rel="noreferrer" style={{color:'#00bfff'}}>Visitar</a></li>
            )}
          </ul>
        </aside>
      </section>
    </div>
  );
}