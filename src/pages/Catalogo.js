import React from 'react';
import Card from '../components/Card';

export default function Catalogo(){
  const juegos = [
    { id: 1, title: 'Eclipse Odyssey', image: 'https://images.unsplash.com/photo-1606813902912-31a7b97b8f8a', genre: 'Aventura', rating: 4.8 },
    { id: 2, title: 'CyberStrike 2077', image: 'https://images.unsplash.com/photo-1617127365659-0f3d1e81f729', genre: 'Acción', rating: 4.2 },
    { id: 3, title: 'Mystic Valley', image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102', genre: 'RPG', rating: 4.6 },
    { id: 4, title: 'Pixel Racers', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420', genre: 'Carreras', rating: 4.0 },
    { id: 5, title: 'Galaxy Defender', image: 'https://images.unsplash.com/photo-1580247819593-0b33831b1f59', genre: 'Shooter', rating: 4.5 },
  ];

  return (
    <div>
      <h1>Catálogo de Juegos</h1>
      <p>Explora nuestra colección con los títulos más populares y nuevos lanzamientos.</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))', gap:20, marginTop:20 }}>
        {juegos.map(juego => (
          <Card key={juego.id} title={juego.title} image={juego.image}>
            <p><strong>Género:</strong> {juego.genre}</p>
            <p>⭐ {juego.rating}/5</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
