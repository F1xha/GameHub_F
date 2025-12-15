import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFavs } from '../utils/favs';

export default function DetalleJuego(){
  const { id } = useParams();
  const [juego, setJuego] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { isFav, toggleFav } = useFavs();

  useEffect(() => {
    const fetchDetalle = async () => {
      setLoading(true);
      try {
        // TU URL DE RENDER
        const response = await fetch(`https://api-wikigames.onrender.com/api/juegos/${id}`);
        
        if (!response.ok) throw new Error('Juego no encontrado');
        
        const data = await response.json();
        setJuego(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetalle();
  }, [id]);

  if (loading) return <p style={{color:'white'}}>Cargando...</p>;
  if (error || !juego) return <p style={{color:'red'}}>Error: {error || 'No encontrado'}</p>;

  const fav = isFav(juego.id);

  return (
    <div>
      <Link to="/catalogo" style={{color:'#00bfff'}}>← Volver</Link>

      <header style={{textAlign:'center', margin:'12px 0 24px'}}>
        <h1>{juego.title}</h1>
        <img src={juego.images?.cover} alt={juego.title} style={{ width:'70%', maxWidth:800, borderRadius:10 }}/>
        
        <div style={{marginTop:12}}>
          <button className="fav-btn" onClick={() => toggleFav(juego.id)}>
            {fav ? '❤️ Quitar' : '🤍 Agregar'}
          </button>
        </div>
      </header>

      <section style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:24}}>
        <div>
          <h2>Descripción</h2>
          <p>{juego.description}</p>
        </div>

        <aside style={{background:'#111', padding:20, borderRadius:10}}>
          <h2>Ficha Técnica</h2>
          <ul style={{lineHeight:1.8}}>
            <li><strong>Desarrollador:</strong> {juego.developer}</li>
            <li><strong>Lanzamiento:</strong> {juego.releaseDate}</li>
            <li><strong>Género:</strong> {juego.genre?.join(', ')}</li>
            <li><strong>Rating:</strong> {juego.rating}</li>
          </ul>
        </aside>
      </section>
    </div>
  );
}