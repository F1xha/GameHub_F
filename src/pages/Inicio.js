import React from 'react';
import Card from '../components/Card';
import { Link } from 'react-router-dom';

export default function Inicio(){
  const destacados = [
    { id: 1, title: 'Eclipse Odyssey', image: 'https://images.unsplash.com/photo-1606813902912-31a7b97b8f8a', desc: 'Un viaje espacial lleno de desafíos y mundos por descubrir.' },
    { id: 2, title: 'CyberStrike 2077', image: 'https://images.unsplash.com/photo-1617127365659-0f3d1e81f729', desc: 'Acción futurista en una ciudad controlada por megacorporaciones.' },
    { id: 3, title: 'Mystic Valley', image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102', desc: 'Explora un valle encantado lleno de criaturas mágicas y secretos.' }
  ];

  return (
    <div>
      <section style={{ textAlign:'center', marginBottom:'2rem' }}>
        <h1>🎮 Bienvenido a <span style={{ color:'#00bfff' }}>GameHub</span></h1>
        <p>Descubre, compara y vive los mejores títulos del mundo gamer.</p>
      </section>

      <h2>🔥 Juegos Destacados</h2>
      <section style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))', gap:20, marginTop:16 }}>
        {destacados.map(juego => (
          <Link key={juego.id} to={`/juego/${juego.id}`} style={{ textDecoration:'none', color:'inherit' }}>
            <Card title={juego.title} image={juego.image}>
              <p>{juego.desc}</p>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}
