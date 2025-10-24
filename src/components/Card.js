import React from 'react';

export default function Card({ title, image, onClick, children }){
  return (
    <article className="card" style={{ border:'1px solid #eee', borderRadius:8, overflow:'hidden', boxShadow:'0 2px 4px rgba(0,0,0,0.1)' }} onClick={onClick}>
      {image && <img src={image} alt={title} style={{ width:'100%', display:'block' }} />}
      <div style={{ padding:12 }}>
        <h3 style={{ margin:'0 0 8px 0' }}>{title}</h3>
        <div>{children}</div>
      </div>
    </article>
  );
}
