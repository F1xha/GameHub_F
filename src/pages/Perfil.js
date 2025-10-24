import React from 'react';

export default function Perfil(){
  const usuario = {
    nombre: 'Gamer123',
    email: 'gamer123@example.com',
    juegosFavoritos: ['Eclipse Odyssey', 'CyberStrike 2077', 'Mystic Valley']
  };

  return (
    <div>
      <h1>Mi Perfil</h1>
      <p><strong>Nombre:</strong> {usuario.nombre}</p>
      <p><strong>Email:</strong> {usuario.email}</p>

      <h2>🎯 Juegos Favoritos</h2>
      <ul>
        {usuario.juegosFavoritos.map((juego, i) => <li key={i}>{juego}</li>)}
      </ul>
    </div>
  );
}
