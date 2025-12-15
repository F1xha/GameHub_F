// src/services/api.js

// URL de tu backend en Render
const API_URL = "https://api-wikigames.onrender.com/api/juegos"; 

// Función para OBTENER (Read)
export const getJuegos = async () => {
    try {
        const res = await fetch(API_URL);
        return await res.json();
    } catch (error) {
        console.error("Error obteniendo juegos:", error);
        return [];
    }
};

// Función para CREAR (Create)
export const createJuego = async (juego) => {
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(juego),
        });
        return await res.json();
    } catch (error) {
        console.error("Error creando juego:", error);
    }
};

// Función para ACTUALIZAR (Update)
export const updateJuego = async (id, juego) => {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(juego),
        });
        return await res.json();
    } catch (error) {
        console.error("Error actualizando juego:", error);
    }
};

// Función para BORRAR (Delete)
export const deleteJuego = async (id) => {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });
        return await res.json();
    } catch (error) {
        console.error("Error borrando juego:", error);
    }
};