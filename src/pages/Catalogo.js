// src/pages/Catalogo.js
import React, { useMemo, useState } from 'react';
import Card from '../components/Card';
import juegos from '../data/juegos';

export default function Catalogo(){
  const [q, setQ] = useState("");
  const [filtro, setFiltro] = useState("Todos");

  const generos = useMemo(() => {
    const set = new Set(juegos.flatMap(j => j.genre));
    return ["Todos", ...Array.from(set)];
  }, []);

  const list = useMemo(() => {
    return juegos.filter(j => {
      const coincideTexto = j.title.toLowerCase().includes(q.toLowerCase());
      const coincideGenero = filtro === "Todos" || j.genre.includes(filtro);
      return coincideTexto && coincideGenero;
    });
  }, [q, filtro]);

  return (
    <div>
      <h1>Catálogo de Juegos</h1>
      <div style={{display:'flex', gap:12, margin:'12px 0'}}>
        <input
          placeholder="Buscar por título..."
          value={q}
          onChange={e=>setQ(e.target.value)}
          style={{padding:8, borderRadius:8, border:'1px solid #333', background:'#121212', color:'#fff'}}
        />
        <select
          value={filtro}
          onChange={e=>setFiltro(e.target.value)}
          style={{padding:8, borderRadius:8, border:'1px solid #333', background:'#121212', color:'#fff'}}
        >
          {generos.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))', gap:20, marginTop:20 }}>
        {list.map(j => (
          <Card key={j.id} title={j.title} image={j.images.cover}>
            <p><strong>Género:</strong> {j.genre.join(', ')}</p>
            <p><strong>Plataformas:</strong> {j.platforms.join(', ')}</p>
            <p>⭐ {j.rating} | Metascore {j.metascore}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
