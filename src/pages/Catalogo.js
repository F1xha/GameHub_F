import React, { useEffect, useState, useMemo } from 'react';
import Card from '../components/Card';
import { useFavs } from '../utils/favs';
import { useNavigate } from 'react-router-dom';

export default function Catalogo() {
  const [juegos, setJuegos] = useState([]); // Todos los juegos de la API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para filtros (Cliente)
  const [q, setQ] = useState("");
  const [gen, setGen] = useState("Todos");
  const [plat, setPlat] = useState("Todas");

  const { isFav, toggleFav } = useFavs();
  const navigate = useNavigate();

  // 1. CARGAR DATOS DE TU API
  useEffect(() => {
    const fetchJuegos = async () => {
      setLoading(true);
      try {
        // TU URL DE RENDER
        const response = await fetch('https://api-wikigames.onrender.com/api/juegos');
        
        if (!response.ok) throw new Error('Error al conectar con tu API');
        
        const data = await response.json();
        setJuegos(data); // Guardamos la lista completa
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJuegos();
  }, []);

  // 2. FILTRADO EN CLIENTE (Igual que antes)
  const generos = useMemo(() => {
    if (!juegos.length) return ["Todos"];
    const set = new Set(juegos.flatMap(j => j.genre || []));
    return ["Todos", ...Array.from(set)];
  }, [juegos]);

  const plataformas = useMemo(() => {
    if (!juegos.length) return ["Todas"];
    const set = new Set(juegos.flatMap(j => j.platforms || []));
    return ["Todas", ...Array.from(set)];
  }, [juegos]);

  const list = useMemo(() => {
    return juegos.filter(j => {
      const coincideTexto = j.title.toLowerCase().includes(q.toLowerCase());
      const coincideGenero = gen === "Todos" || (j.genre && j.genre.includes(gen));
      const coincidePlataforma = plat === "Todas" || (j.platforms && j.platforms.includes(plat));
      return coincideTexto && coincideGenero && coincidePlataforma;
    });
  }, [juegos, q, gen, plat]);

  if (loading) return <div style={{color:'white', textAlign:'center', marginTop:50}}>Cargando tu API...</div>;
  if (error) return <div style={{color:'red', textAlign:'center', marginTop:50}}>Error: {error}</div>;

  return (
    <div>
      <h1>Catálogo (Desde mi API Propia)</h1>

      {/* Filtros */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, margin: '12px 0' }}>
        <input placeholder="Buscar..." value={q} onChange={e => setQ(e.target.value)} style={{ padding: 8, borderRadius: 8 }} />
        <select value={gen} onChange={e => setGen(e.target.value)} style={{ padding: 8, borderRadius: 8 }}>
          {generos.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
        <select value={plat} onChange={e => setPlat(e.target.value)} style={{ padding: 8, borderRadius: 8 }}>
          {plataformas.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 20, marginTop: 20 }}>
        {list.map(j => (
          <Card
            key={j.id}
            title={j.title} // Tu API usa 'title', no 'name'
            image={j.images?.cover} // Tu estructura original
            fav={isFav(j.id)}
            onToggleFav={() => toggleFav(j.id)}
            onClick={() => navigate(`/juego/${j.id}`)}
          >
            <p><strong>Género:</strong> {j.genre?.join(', ')}</p>
            <p>⭐ {j.rating}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}