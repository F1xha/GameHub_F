import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(){
  return (
    <nav style={{display:'flex', gap:16, padding:16, background:'#f8f8f8', borderBottom:'1px solid #ddd'}}>
      <Link to="/">Inicio</Link>
      <Link to="/catalogo">Catálogo</Link>
      <Link to="/sobre-nosotros">Sobre Nosotros</Link>
      <Link to="/contacto">Contacto</Link>
      <Link to="/perfil">Perfil</Link>
    </nav>
  );
}
