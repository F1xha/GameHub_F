// Importamos React y los hooks necesarios:
// - useState: para guardar datos (juegos, carga, errores).
// - useEffect: para ejecutar código (la llamada a la API) cuando carga la página.
import React, { useEffect, useState } from 'react';

// Importamos nuestro componente visual de "Tarjeta" para mostrar cada juego.
import Card from '../components/Card';

// Importamos el hook personalizado para manejar favoritos (lógica de guardado).
import { useFavs } from '../utils/favs';

// Importamos el hook para navegar a otra página (ir al detalle del juego).
import { useNavigate } from 'react-router-dom';

export default function Catalogo() {
  // --- ESTADOS (Memoria del componente) ---
  
  // 'juegos': Array para guardar la lista de juegos que nos responda la API.
  const [juegos, setJuegos] = useState([]);     
  
  // 'loading': Booleano (true/false) para saber si estamos esperando la respuesta.
  // Empieza en true porque al abrir la página, inmediatamente cargamos datos.
  const [loading, setLoading] = useState(true); 
  
  // 'error': Para guardar un mensaje si algo sale mal (ej: sin internet).
  const [error, setError] = useState(null);
  
  // 'q': El texto que el usuario escribe en el buscador (query).
  const [q, setQ] = useState("");
  
  // Extraemos funciones y datos de nuestros hooks personalizados.
  const { isFav, toggleFav } = useFavs(); // isFav: ¿es favorito?, toggleFav: poner/quitar.
  const navigate = useNavigate(); // Para cambiar de ruta programáticamente.

  // 🔑 TU CLAVE DE API (Esencial para que RAWG nos dé permiso).
  const API_KEY = "6a3bd592aa9449448bb1f9a8ef8fd02f"; 

  // --- EFECTO (Llamada a la API) ---
  // Este bloque se ejecuta automáticamente cuando el componente nace
  // y cada vez que la variable 'q' (búsqueda) cambia.
  useEffect(() => {
    
    // Función asíncrona para pedir los datos.
    const fetchJuegos = async () => {
      setLoading(true); // Avisamos que empezamos a cargar.
      setError(null);   // Limpiamos errores anteriores.
      
      try {
        // Definimos la URL base de la API.
        const baseUrl = "https://api.rawg.io/api/games";
        
        // Decidimos qué URL usar:
        // - Si 'q' tiene texto, usamos el endpoint de búsqueda (&search=...).
        // - Si no, pedimos una lista general (page_size=20 para traer 20 juegos).
        const url = q 
          ? `${baseUrl}?key=${API_KEY}&search=${q}` 
          : `${baseUrl}?key=${API_KEY}&page_size=20`;

        // Hacemos la petición HTTP real a Internet. 'await' espera la respuesta.
        const response = await fetch(url);
        
        // Verificamos si la respuesta fue exitosa (código 200-299).
        if (!response.ok) {
          throw new Error(`Error en la conexión: ${response.statusText}`);
        }

        // Convertimos la respuesta "cruda" a formato JSON (objetos de JS).
        const data = await response.json();
        
        // Guardamos la lista de juegos en el estado. 
        // RAWG devuelve los juegos dentro de una propiedad llamada 'results'.
        setJuegos(data.results); 
        
      } catch (err) {
        // Si algo falla (try), caemos aquí (catch).
        console.error(err);
        setError("No se pudieron cargar los juegos. Revisa tu conexión o la API Key.");
      } finally {
        // Esto se ejecuta SIEMPRE al final, haya error o éxito.
        // Apagamos el indicador de carga.
        setLoading(false);
      }
    };

    // --- DEBOUNCE (Optimización) ---
    // No queremos llamar a la API con cada letra que escribes rápido.
    // Esperamos 500ms después de que dejes de escribir para ejecutar la búsqueda.
    const timeoutId = setTimeout(() => fetchJuegos(), 500);
    
    // Función de limpieza: si escribes otra letra antes de los 500ms,
    // cancelamos el timeout anterior para no hacer llamadas innecesarias.
    return () => clearTimeout(timeoutId);

  }, [q]); // Dependencia: el efecto vigila la variable 'q'.

  // --- RENDERIZADO CONDICIONAL (Qué mostramos según el estado) ---

  // 1. Si está cargando y no tenemos juegos previos, mostramos mensaje de carga.
  if (loading && juegos.length === 0) {
    return <div style={{color:'white', textAlign:'center', marginTop: 50}}><h2>Cargando catálogo...</h2></div>;
  }

  // 2. Si hubo un error, lo mostramos en rojo.
  if (error) {
    return (
      <div style={{color:'#ff7676', textAlign:'center', marginTop: 50}}>
        <h2>⚠️ Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  // 3. Si todo salió bien, mostramos la interfaz principal.
  return (
    <div>
      <h1>Catálogo de Juegos</h1>

      {/* Barra de búsqueda controlada por el estado 'q' */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, margin: '12px 0' }}>
        <input
          placeholder="Buscar videojuego..."
          value={q} // El valor del input es el estado 'q'.
          onChange={e => setQ(e.target.value)} // Al escribir, actualizamos 'q'.
          style={{ padding: 10, borderRadius: 8, border: '1px solid #333', background: '#121212', color: '#fff', width: '100%', maxWidth: '400px' }}
        />
      </div>

      {/* Rejilla (Grid) para mostrar las tarjetas de juegos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 20, marginTop: 20 }}>
        
        {/* Recorremos el array 'juegos' y creamos una <Card> por cada uno */}
        {juegos.map(j => (
          <Card
            key={j.id} // Clave única requerida por React para listas.
            
            // Pasamos los datos de la API a las propiedades (props) del componente Card.
            title={j.name} // RAWG usa 'name'.
            image={j.background_image} // RAWG usa 'background_image'.
            
            // Verificamos si este ID está en favoritos.
            fav={isFav(j.id)}
            
            // Función para agregar/quitar favorito.
            onToggleFav={() => toggleFav(j.id)}
            
            // Al hacer click en la tarjeta, navegamos a la página de detalle.
            onClick={() => navigate(`/juego/${j.id}`)}
          >
            {/* Contenido extra dentro de la tarjeta (children) */}
            
            {/* Mostramos los géneros. slice(0,2) para mostrar solo los 2 primeros. */}
            <p><strong>Géneros:</strong> {j.genres?.map(g => g.name).slice(0, 2).join(', ')}</p>
            
            {/* Mostramos plataformas. RAWG las trae anidadas en 'platform'. */}
            <p><strong>Plataformas:</strong> {j.platforms?.map(p => p.platform.name).slice(0, 2).join(', ')}</p>
            
            {/* Mostramos puntuaciones. */}
            <p>⭐ {j.rating} | Metascore {j.metacritic || 'N/A'}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}