import React, { useMemo, useState } from 'react';
import Card from '../components/Card';
import juegos from '../data/juegos';
import { useFavs } from '../utils/favs';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

export default function Catalogo() {
  const [q, setQ] = useState("");
  const [gen, setGen] = useState("Todos");
  const [plat, setPlat] = useState("Todas");
  const { isFav, toggleFav } = useFavs();
  const navigate = useNavigate(); // Inicializa useNavigate

  const generos = useMemo(() => {
    const set = new Set(juegos.flatMap(j => j.genre));
    return ["Todos", ...Array.from(set)];
  }, []);

  const plataformas = useMemo(() => {
    const set = new Set(juegos.flatMap(j => j.platforms));
    return ["Todas", ...Array.from(set)];
  }, []);

  const list = useMemo(() => {
    return juegos.filter(j => {
      const coincideTexto = j.title.toLowerCase().includes(q.toLowerCase());
      const coincideGenero = gen === "Todos" || j.genre.includes(gen);
      const coincidePlataforma = plat === "Todas" || j.platforms.includes(plat);
      return coincideTexto && coincideGenero && coincidePlataforma;
    });
  }, [q, gen, plat]);

  return (
    <div>
      <h1>Catálogo de Juegos</h1>

      {/* Controles de filtro */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, margin: '12px 0' }}>
        <input
          placeholder="Buscar por título..."
          value={q}
          onChange={e => setQ(e.target.value)}
          style={{ padding: 8, borderRadius: 8, border: '1px solid #333', background: '#121212', color: '#fff' }}
        />

        <select
          value={gen}
          onChange={e => setGen(e.target.value)}
          style={{ padding: 8, borderRadius: 8, border: '1px solid #333', background: '#121212', color: '#fff' }}
        >
          {generos.map(g => <option key={g} value={g}>{g}</option>)}
        </select>

        <select
          value={plat}
          onChange={e => setPlat(e.target.value)}
          style={{ padding: 8, borderRadius: 8, border: '1px solid #333', background: '#121212', color: '#fff' }}
        >
          {plataformas.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      {/* Grid de tarjetas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 20, marginTop: 20 }}>
        {list.map(j => (
          <Card
            key={j.id}
            title={j.title}
            image={j.images.cover}
            fav={isFav(j.id)}
            onToggleFav={() => toggleFav(j.id)}
            onClick={() => navigate(`/juego/${j.id}`)} // Aquí asignas la navegación
          >
            <p><strong>Género:</strong> {j.genre.join(', ')}</p>
            <p><strong>Plataformas:</strong> {j.platforms.join(', ')}</p>
            <p>⭐ {j.rating} | Metascore {j.metascore}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

