import React from 'react';
import Card from '../components/Card';

export default function Catalogo(){
  const juegos = [
    { id: 1, title: 'Juego Alpha', image: '/assets/juego-alpha.jpg' },
    { id: 2, title: 'Juego Beta', image: '/assets/juego-beta.jpg' },
    { id: 3, title: 'Juego Gamma', image: '/assets/juego-gamma.jpg' }
  ];

  return (
    <div>
      <h1>Catálogo de Juegos</h1>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:16 }}>
        {juegos.map(juego => (
          <Card key={juego.id} title={juego.title} image={juego.image} />
        ))}
      </div>
    </div>
  );
}
