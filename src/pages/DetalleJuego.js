import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function DetalleJuego(){
  const { id } = useParams();

  const juego = {
    1: { title: 'Eclipse Odyssey', desc: 'Viaja a través de galaxias desconocidas.', img: 'https://images.unsplash.com/photo-1606813902912-31a7b97b8f8a' },
    2: { title: 'CyberStrike 2077', desc: 'Lucha contra el sistema en una metrópolis del futuro.', img: 'https://images.unsplash.com/photo-1617127365659-0f3d1e81f729' },
    3: { title: 'Mystic Valley', desc: 'Explora la magia y la fantasía en un valle místico.', img: 'https://images.unsplash.com/photo-1520763185298-1b434c919102' },
  }[id] || null;

  if(!juego){
    return <p>Juego no encontrado.</p>;
  }

  return (
    <div style={{ textAlign:'center' }}>
      <h1>{juego.title}</h1>
      <img src={juego.img} alt={juego.title} style={{ width:'60%', borderRadius:10, margin:'1rem 0' }}/>
      <p style={{ maxWidth:600, margin:'0 auto' }}>{juego.desc}</p>
      <Link to="/catalogo" style={{ display:'inline-block', marginTop:20, color:'#00bfff' }}>← Volver al catálogo</Link>
    </div>
  );
}
