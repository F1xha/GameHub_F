import React from 'react';
import '../styles/card.css';

export default function Card({ title, image, onClick, children }) {
  return (
    <article className="card" onClick={onClick}>
      {image && <img src={image} alt={title} className="card-image" />}
      <div className="card-content">
        <h3>{title}</h3>
        {children && <div className="card-children">{children}</div>}
      </div>
    </article>
  );
}
