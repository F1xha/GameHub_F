import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

export default function Inicio() {
  const [destacados, setDestacados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔑 REEMPLAZA ESTO CON TU CLAVE DE RAWG
  const API_KEY = "6a3bd592aa9449448bb1f9a8ef8fd02f";

  useEffect(() => {
    const fetchDestacados = async () => {
      try {
        // Pedimos 3 juegos ordenados por rating para la sección de destacados
        const url = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=3&ordering=-rating`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error("Error al cargar destacados");
        }

        const data = await response.json();
        setDestacados(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDestacados();
  }, []);

  return (
    <div>
      {/* Hero simple */}
      <section style={{ textAlign:'center', marginBottom:'2rem' }}>
        <h1>🎮 Bienvenido a <span style={{ color:'#00bfff' }}>GameHub</span></h1>
        <p>Descubre, compara y guarda tus juegos favoritos desde una API real.</p>
      </section>

      {/* Grid de destacados */}
      <h2>🔥 Juegos Destacados (Top Rated)</h2>
      
      {loading && <p style={{textAlign: 'center'}}>Cargando destacados...</p>}
      {error && <p style={{color: 'red', textAlign: 'center'}}>No se pudieron cargar los destacados.</p>}

      <section style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))', gap:20, marginTop:16 }}>
        {!loading && !error && destacados.map((j) => (
          <Link key={j.id} to={`/juego/${j.id}`} style={{ textDecoration:'none', color:'inherit' }}>
            <Card 
              title={j.name} 
              image={j.background_image}
            >
              {/* RAWG no siempre trae descripción en la lista, así que mostramos datos técnicos */}
              <p style={{opacity:.8, fontSize:14}}>
                {j.genres?.map(g => g.name).slice(0, 2).join(' • ')} 
                <br/> 
                ⭐ {j.rating} | Metascore {j.metacritic || 'N/A'}
              </p>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}