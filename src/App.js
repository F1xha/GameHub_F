// App.js
// Punto de entrada de la app: define rutas con React Router
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Navbar reutilizable en todas las páginas
import Navbar from './components/Navbar';

// Páginas
import Inicio from './pages/Inicio';
import Catalogo from './pages/Catalogo';
import SobreNosotros from './pages/SobreNosotros';
import Contacto from './pages/Contacto';
import Perfil from './pages/Perfil';
import DetalleJuego from './pages/DetalleJuego';

export default function App(){
  return (
    // Router de toda la app
    <Router>
      {/* Navegación fija */}
      <Navbar />

      {/* Contenedor principal de las vistas */}
      <main style={{ padding:'1rem' }}>
        {/* Tabla de rutas */}
        <Routes>
          {/* Inicio */}
          <Route path="/" element={<Inicio />} />
          {/* Listado principal de juegos */}
          <Route path="/catalogo" element={<Catalogo />} />
          {/* Detalle por id (string o slug) */}
          <Route path="/juego/:id" element={<DetalleJuego />} />
          {/* Páginas informativas */}
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          {/* Perfil con login/registro + favoritos */}
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </main>
    </Router>
  );
}
