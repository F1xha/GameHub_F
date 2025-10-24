import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './styles/global.css';

import Inicio from './pages/Inicio';
import Catalogo from './pages/Catalogo';
import DetalleJuego from './pages/DetalleJuego';
import SobreNosotros from './pages/SobreNosotros';
import Contacto from './pages/Contacto';
import Perfil from './pages/Perfil';

export default function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ padding: '1rem 2rem' }}>
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
