// src/utils/favs.js
import { useCallback, useEffect, useState } from 'react';

const KEY = 'gamehub_favs';

function readFavs() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeFavs(arr) {
  try {
    localStorage.setItem(KEY, JSON.stringify(arr));
  } catch {}
}

export function useFavs() {
  const [favs, setFavs] = useState(() => readFavs());

  useEffect(() => {
    writeFavs(favs);
  }, [favs]);

  const isFav = useCallback((id) => favs.includes(id), [favs]);

  const addFav = useCallback((id) => {
    setFavs((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const removeFav = useCallback((id) => {
    setFavs((prev) => prev.filter((x) => x !== id));
  }, []);

  const toggleFav = useCallback((id) => {
    setFavs((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const clearFavs = useCallback(() => setFavs([]), []);

  return { favs, isFav, addFav, removeFav, toggleFav, clearFavs };
}
