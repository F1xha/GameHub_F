import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { useFavs } from '../utils/favs';
import { useNavigate } from 'react-router-dom';

export default function Catalogo() {
  // Estados para cumplir con la rubrica (Datos dinámicos, Carga y Error)
  const [juegos, setJuegos] = useState([]);     
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  
  // Estados de filtros
  const [q, setQ] = useState("");
  
  const { isFav, toggleFav } = useFavs();
  const navigate = useNavigate();

  // 🔑 CLAVE DE API (RAWG.io)
  const API_KEY = "6a3bd592aa9449448bb1f9a8ef8fd02f"; 

  useEffect(() => {
    const fetchJuegos = async () => {
      setLoading(true);
      setError(null);
      try {
        // Construimos la URL: Si hay busqueda (q), usamos el endpoint de búsqueda
        const baseUrl = "https://api.rawg.io/api/games";
        const url = q 
          ? `${baseUrl}?key=${API_KEY}&search=${q}` 
          : `${baseUrl}?key=${API_KEY}&page_size=40`; // Traemos 40 populares por defecto

        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Error en la conexión: ${response.statusText}`);
        }

        const data = await response.json();
        setJuegos(data.results); // RAWG devuelve la lista en 'results'
        
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los juegos. Revisa tu conexión o la API Key.");
      } finally {
        setLoading(false);
      }
    };

    // Debounce: Esperamos 500ms después de que dejes de escribir para buscar
    const timeoutId = setTimeout(() => fetchJuegos(), 500);
    return () => clearTimeout(timeoutId);

  }, [q]); // Se ejecuta al montar y cuando cambia 'q'

  // Manejo visual de estados de carga y error
  if (loading && juegos.length === 0) {
    return <div style={{color:'white', textAlign:'center', marginTop: 50}}><h2>Cargando catálogo...</h2></div>;
  }

  if (error) {
    return (
      <div style={{color:'#ff7676', textAlign:'center', marginTop: 50}}>
        <h2>⚠️ Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Catálogo de Juegos</h1>

      {/* Barra de búsqueda */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, margin: '12px 0' }}>
        <input
          placeholder="Buscar videojuego..."
          value={q}
          onChange={e => setQ(e.target.value)}
          style={{ padding: 10, borderRadius: 8, border: '1px solid #333', background: '#121212', color: '#fff', width: '100%', maxWidth: '400px' }}
        />
      </div>

      {/* Grid de tarjetas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 20, marginTop: 20 }}>
        {juegos.map(j => (
          <Card
            key={j.id}
            // Adaptamos los datos de la API a tu componente Card
            title={j.name} 
            image={j.background_image} 
            fav={isFav(j.id)}
            onToggleFav={() => toggleFav(j.id)}
            onClick={() => navigate(`/juego/${j.id}`)}
          >
            {/* Mostramos Géneros y Rating igual que antes, pero extrayendo de la API */}
            <p><strong>Géneros:</strong> {j.genres?.map(g => g.name).slice(0, 2).join(', ')}</p>
            {/* Platforms viene como array de objetos en RAWG */}
            <p><strong>Plataformas:</strong> {j.platforms?.map(p => p.platform.name).slice(0, 2).join(', ')}</p>
            <p>⭐ {j.rating} | Metascore {j.metacritic || 'N/A'}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}