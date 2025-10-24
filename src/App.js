import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

import Inicio from './pages/Inicio';
import Catalogo from './pages/Catalogo';
import SobreNosotros from './pages/SobreNosotros';
import Contacto from './pages/Contacto';
import Perfil from './pages/Perfil';
import DetalleJuego from './pages/DetalleJuego';

export default function App(){
  return (
    <Router>
      <Navbar />
      <main style={{ padding:'1rem' }}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/juego/:id" element={<DetalleJuego />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </main>
    </Router>
  );
}
