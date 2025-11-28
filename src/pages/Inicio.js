import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

export default function Inicio() {
  // Estados para manejar los juegos destacados, la carga y posibles errores
  const [destacados, setDestacados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // 🔑 TU CLAVE DE API
  const API_KEY = "6a3bd592aa9449448bb1f9a8ef8fd02f";

  useEffect(() => {
    const obtenerDestacados = async () => {
      try {
        // Pedimos los juegos ordenados por rating (-rating = descendente) y limitamos a 3.
        const url = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=3&ordering=-rating`;
        const respuesta = await fetch(url);
        
        if (!respuesta.ok) {
          throw new Error("Error al cargar los juegos destacados");
        }

        const datos = await respuesta.json();
        setDestacados(datos.results); // Guardamos los 3 juegos en el estado.
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false); // Terminamos la carga.
      }
    };

    obtenerDestacados();
  }, []); // Array vacío [] significa: ejecutar solo una vez al montar el componente.

  return (
    <div>
      {/* Sección de bienvenida (Hero) */}
      <section style={{ textAlign:'center', marginBottom:'2rem' }}>
        <h1>🎮 Bienvenido a <span style={{ color:'#00bfff' }}>GameHub</span></h1>
        <p>Descubre, compara y guarda tus juegos favoritos usando datos reales.</p>
      </section>

      {/* Sección de Juegos Destacados */}
      <h2>🔥 Juegos Destacados (Mejor Valorados)</h2>
      
      {/* Mensajes de estado simples */}
      {cargando && <p style={{textAlign: 'center'}}>Cargando destacados...</p>}
      {error && <p style={{color: 'red', textAlign: 'center'}}>No se pudieron cargar los destacados.</p>}

      {/* Grilla de tarjetas */}
      <section style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))', gap:20, marginTop:16 }}>
        {/* Si no está cargando y no hay error, mostramos (mapeamos) los juegos */}
        {!cargando && !error && destacados.map((juego) => (
          <Link key={juego.id} to={`/juego/${juego.id}`} style={{ textDecoration:'none', color:'inherit' }}>
            <Card 
              title={juego.name} 
              image={juego.background_image}
            >
              {/* Información resumida para la tarjeta de inicio */}
              <p style={{opacity:0.8, fontSize:14}}>
                {juego.genres?.map(g => g.name).slice(0, 2).join(' • ')} 
                <br/> 
                ⭐ {juego.rating} | Metascore {juego.metacritic || 'N/A'}
              </p>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}