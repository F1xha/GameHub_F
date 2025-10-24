// components/Card.js
// Componente reutilizable de tarjeta: imagen + título + contenido + botón favorito opcional
import React from 'react';
import '../styles/card.css';

export default function Card({ title, image, onClick, children, fav, onToggleFav }) {
  return (
    // El onClick se pasa desde fuera (por ejemplo, navegar al detalle)
    <article className="card" onClick={onClick}>
      {/* Imagen (opcional) */}
      {image && <img src={image} alt={title} className="card-image" />}

      <div className="card-content">
        {/* Header de la card: título + favorito */}
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:8}}>
          <h3 style={{margin:0}}>{title}</h3>

          {/* Botón de favoritos (si se entrega prop onToggleFav) */}
          {onToggleFav && (
            <button
              type="button"
              aria-label={fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              className="fav-btn"
              onClick={(e) => { 
                e.stopPropagation(); // evita disparar onClick de la card
                onToggleFav();
              }}
              title={fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              {fav ? '❤️' : '🤍'}
            </button>
          )}
        </div>

        {/* Contenido variable (props.children) */}
        {children && <div className="card-children">{children}</div>}
      </div>
    </article>
  );
}
