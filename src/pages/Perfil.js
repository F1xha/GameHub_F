import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { useFavs } from '../utils/favs';
import { getJuegos } from '../services/api'; // Usamos tu servicio existente
import { useNavigate, Link } from 'react-router-dom';

export default function Perfil() {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Hook de favoritos y navegación
  const { isFav, toggleFav } = useFavs();
  const navigate = useNavigate();

  // Simulación de datos de usuario (puedes conectarlo a auth.js si quieres)
  const usuario = {
    nombre: "Usuario Gamer",
    email: "gamer@wikigames.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
  };

  useEffect(() => {
    const fetchFavoritos = async () => {
      setLoading(true);
      try {
        // 1. Traemos la lista actualizada de la base de datos
        const todosLosJuegos = await getJuegos();
        
        // 2. Filtramos: Solo guardamos los juegos cuyo _id esté en favoritos
        // IMPORTANTE: MongoDB usa '_id', asegúrate de que isFav use ese campo
        const misFavs = todosLosJuegos.filter(juego => isFav(juego._id));
        
        setFavoritos(misFavs);
      } catch (error) {
        console.error("Error cargando favoritos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritos();
  }, [isFav]); // Se recarga si cambian los favoritos

  // Función para quitar un favorito y actualizar la vista al instante
  const quitarDeFavoritos = (id) => {
    toggleFav(id); 
    // Filtramos la lista local para que desaparezca la tarjeta sin recargar
    setFavoritos(prev => prev.filter(j => j._id !== id));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', color: 'white' }}>
      
      {/* Sección de Datos del Usuario */}
      <header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '20px', 
        background: '#222', 
        padding: '20px', 
        borderRadius: '15px',
        marginBottom: '30px',
        border: '1px solid #444'
      }}>
        <img 
          src={usuario.avatar} 
          alt="Avatar" 
          style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#333' }} 
        />
        <div>
          <h1 style={{ margin: 0, fontSize: '1.8rem' }}>{usuario.nombre}</h1>
          <p style={{ margin: '5px 0 0', color: '#aaa' }}>{usuario.email}</p>
        </div>
      </header>

      {/* Sección de Favoritos */}
      <section>
        <h2 style={{ borderBottom: '2px solid #00bfff', paddingBottom: '10px', display:'inline-block' }}>
          Mis Juegos Favoritos ❤️
        </h2>

        {loading ? (
          <p style={{ textAlign: 'center', marginTop: '20px' }}>Cargando tus juegos...</p>
        ) : favoritos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', background: '#111', borderRadius: '10px', marginTop:'20px' }}>
            <h3>Aún no tienes favoritos 😢</h3>
            <p>Ve al catálogo y dale corazón a los juegos que más te gusten.</p>
            <Link to="/catalogo" style={{ color: '#00bfff', textDecoration: 'none', fontWeight: 'bold' }}>
              Ir al Catálogo →
            </Link>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '20px', 
            marginTop: '20px' 
          }}>
            {favoritos.map(j => (
              <Card
                key={j._id} // ¡Usar _id de Mongo!
                title={j.title}
                image={j.images?.cover}
                
                // Siempre será true porque estamos en la lista de favoritos
                fav={true} 
                
                // Al hacer click en el corazón, lo quitamos de la lista
                onToggleFav={() => quitarDeFavoritos(j._id)}
                
                // Navegación al detalle con el _id correcto
                onClick={() => navigate(`/juego/${j._id}`)}
              >
                <p><strong>Género:</strong> {j.genre?.join(', ')}</p>
                <p style={{ color: '#ffd700' }}>⭐ {j.rating}</p>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}