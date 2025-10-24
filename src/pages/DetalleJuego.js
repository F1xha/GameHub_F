// src/pages/DetalleJuego.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import juegos from '../data/juegos';

export default function DetalleJuego(){
  const { id } = useParams();
  const juego = juegos.find(j => j.id === id || String(j.id) === String(id));

  if(!juego){
    return <p>Juego no encontrado. <Link to="/catalogo" style={{color:'#00bfff'}}>Volver</Link></p>;
  }

  return (
    <div>
      <Link to="/catalogo" style={{color:'#00bfff'}}>← Volver al catálogo</Link>
      <header style={{textAlign:'center', margin:'12px 0 24px'}}>
        <h1>{juego.title}</h1>
        <img src={juego.images.cover} alt={juego.title} style={{ width:'70%', maxWidth:900, borderRadius:10 }}/>
      </header>

      <section style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:24}}>
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

          <h3>Tiendas</h3>
          <ul>
            {juego.store?.steam && <li><a href={juego.store.steam} target="_blank" rel="noreferrer">Steam</a></li>}
            {juego.store?.epic && <li><a href={juego.store.epic} target="_blank" rel="noreferrer">Epic</a></li>}
            {juego.store?.gog && <li><a href={juego.store.gog} target="_blank" rel="noreferrer">GOG</a></li>}
            {juego.store?.playstation && <li><a href={juego.store.playstation} target="_blank" rel="noreferrer">PlayStation</a></li>}
            {juego.store?.xbox && <li><a href={juego.store.xbox} target="_blank" rel="noreferrer">Xbox</a></li>}
            {juego.store?.switch && <li><a href={juego.store.switch} target="_blank" rel="noreferrer">Switch</a></li>}
            {juego.store?.microsoft && <li><a href={juego.store.microsoft} target="_blank" rel="noreferrer">Microsoft Store</a></li>}
            {juego.store?.riot && <li><a href={juego.store.riot} target="_blank" rel="noreferrer">Riot</a></li>}
            {juego.store?.rockstar && <li><a href={juego.store.rockstar} target="_blank" rel="noreferrer">Rockstar</a></li>}
          </ul>
        </aside>
      </section>
    </div>
  );
}
