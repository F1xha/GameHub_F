// src/pages/Inicio.js
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import juegos from '../data/juegos';

export default function Inicio(){
  const destacados = juegos.slice(0, 3);

  return (
    <div>
      <section style={{ textAlign:'center', marginBottom:'2rem' }}>
        <h1>🎮 Bienvenido a <span style={{ color:'#00bfff' }}>GameHub</span></h1>
        <p>Descubre, compara y guarda tus juegos favoritos.</p>
      </section>

      <h2>🔥 Juegos Destacados</h2>
      <section style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))', gap:20, marginTop:16 }}>
        {destacados.map((j) => (
          <Link key={j.id} to={`/juego/${j.id}`} style={{ textDecoration:'none', color:'inherit' }}>
            <Card title={j.title} image={j.images.cover}>
              <p>{j.description}</p>
              <p style={{opacity:.8, fontSize:14}}>{j.genre.join(' • ')} | ⭐ {j.rating} | Metascore {j.metascore}</p>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}
