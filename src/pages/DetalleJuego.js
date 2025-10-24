// pages/DetalleJuego.js
// Ficha completa de un juego según el :id de la URL
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import juegos from '../data/juegos';
import { useFavs } from '../utils/favs';

export default function DetalleJuego(){
  const { id } = useParams();
  // Busca por id o por slug string
  const juego = juegos.find(j => j.id === id || String(j.id) === String(id));
  const { isFav, toggleFav } = useFavs();

  if(!juego){
    return <p>Juego no encontrado. <Link to="/catalogo" style={{color:'#00bfff'}}>Volver</Link></p>;
  }

  const fav = isFav(juego.id);

  return (
    <div>
      <Link to="/catalogo" style={{color:'#00bfff'}}>← Volver al catálogo</Link>

      {/* Cabecera */}
      <header style={{textAlign:'center', margin:'12px 0 24px'}}>
        <h1>{juego.title}</h1>
        <img src={juego.images.cover} alt={juego.title} style={{ width:'70%', maxWidth:900, borderRadius:10 }}/>
        {/* Botón favorito */}
        <div style={{marginTop:12}}>
          <button
            className="fav-btn"
            onClick={() => toggleFav(juego.id)}
            style={{background:'#1b1b1b', color:'#fff', border:'1px solid #333', padding:'6px 10px', borderRadius:8, cursor:'pointer'}}
          >
            {fav ? '❤️ Quitar de favoritos' : '🤍 Agregar a favoritos'}
          </button>
        </div>
      </header>

      {/* Layout 2 columnas: descripción + ficha */}
      <section style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:24}}>
        {/* Columna izquierda */}
        <div>
          <h2>Descripción</h2>
          <p>{juego.description}</p>

          <h3>Capturas</h3>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:12}}>
            {juego.images.screenshots?.map((s, i) => (
              <img key={i} src={s} alt={`${juego.title} screenshot ${i+1}`} style={{width:'100%', borderRadius:8}}/>
            ))}
          </div>
        </div>

        {/* Columna derecha (ficha) */}
        <aside>
          <h2>Ficha Técnica</h2>
          <ul style={{lineHeight:1.8}}>
            <li><strong>Desarrollador:</strong> {juego.developer}</li>
            <li><strong>Publisher:</strong> {juego.publisher}</li>
            <li><strong>Lanzamiento:</strong> {juego.releaseDate}</li>
            <li><strong>Género:</strong> {juego.genre.join(', ')}</li>
            <li><strong>Plataformas:</strong> {juego.platforms.join(', ')}</li>
            <li><strong>Clasificación:</strong> {juego.esrb}</li>
            <li><strong>Metascore:</strong> {juego.metascore}</li>
            <li><strong>Rating Usuarios:</strong> {juego.rating}</li>
            <li><strong>Precio referencial:</strong> ${juego.price}</li>
            {juego.tags?.length ? <li><strong>Tags:</strong> {juego.tags.join(', ')}</li> : null}
          </ul>

          <h3>Requisitos (orientativos PC)</h3>
          <p><strong>Mínimos:</strong> {juego.requirements.minimum}</p>
          <p><strong>Recomendados:</strong> {juego.requirements.recommended}</p>
        </aside>
      </section>
    </div>
  );
}
