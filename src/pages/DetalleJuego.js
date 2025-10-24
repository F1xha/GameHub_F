import React from 'react';
import { useParams } from 'react-router-dom';

export default function DetalleJuego(){
  const { id } = useParams();

  // Aquí podrías cargar datos según el id
  return (
    <div>
      <h1>Detalle del Juego {id}</h1>
      <p>Aquí va la información detallada del juego seleccionado.</p>
    </div>
  );
}
