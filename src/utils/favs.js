// utils/favs.js
// Hook para gestionar favoritos con persistencia en localStorage (clave 'gamehub_favs')
import { useCallback, useEffect, useState } from 'react';

const KEY = 'gamehub_favs';

// Lee la lista guardada o devuelve []
function readFavs() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Guarda la lista en localStorage
function writeFavs(arr) {
  try {
    localStorage.setItem(KEY, JSON.stringify(arr));
  } catch {}
}

// Hook que expone API de favoritos
export function useFavs() {
  // Estado inicial: lo que haya guardado
  const [favs, setFavs] = useState(() => readFavs());

  // Cada vez que cambian, persiste en localStorage
  useEffect(() => {
    writeFavs(favs);
  }, [favs]);

  // Helpers: consulta si está en favoritos
  const isFav = useCallback((id) => favs.includes(id), [favs]);

  // Agrega si no existe
  const addFav = useCallback((id) => {
    setFavs(prev => prev.includes(id) ? prev : [...prev, id]);
  }, []);

  // Elimina si existe
  const removeFav = useCallback((id) => {
    setFavs(prev => prev.filter(x => x !== id));
  }, []);

  // Alterna agregar/quitar
  const toggleFav = useCallback((id) => {
    setFavs(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }, []);

  // Limpia todos
  const clearFavs = useCallback(() => setFavs([]), []);

  // API del hook
  return { favs, isFav, addFav, removeFav, toggleFav, clearFavs };
}
