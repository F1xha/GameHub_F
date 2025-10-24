import React from 'react';
import Card from '../components/Card';
import { Link } from 'react-router-dom';

export default function Inicio(){
  const destacados = [
    { id: 1, title: 'Juego Alpha', image: '/assets/juego-alpha.jpg' },
    { id: 2, title: 'Juego Beta', image: '/assets/juego-beta.jpg' }
  ];

  return (
    <div>
      <h1>Bienvenido a GameHub</h1>
      <section style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:16 }}>
        {destacados.map(juego => (
          <Link key={juego.id} to={`/juego/${juego.id}`} style={{ textDecoration:'none', color:'inherit' }}>
            <Card title={juego.title} image={juego.image} />
          </Link>
        ))}
      </section>
    </div>
  );
}
