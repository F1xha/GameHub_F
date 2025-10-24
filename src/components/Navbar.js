// components/Navbar.js
// Barra de navegación superior con links a las secciones
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navbar.css'; // estilos del navbar
import { useFavs } from '../utils/favs'; // para mostrar contador de favoritos

export default function Navbar() {
  const location = useLocation();
  const { favs } = useFavs();

  // Definición de enlaces del menú
  const links = [
    { path: '/', label: 'Inicio' },
    { path: '/catalogo', label: 'Catálogo' },
    { path: '/sobre-nosotros', label: 'Sobre Nosotros' },
    { path: '/contacto', label: 'Contacto' },
    // Muestra contador de favoritos cerca de Perfil
    { path: '/perfil', label: `Perfil ${favs.length ? `(${favs.length})` : ''}` },
  ];

  return (
    <nav className="navbar">
      <h1 className="navbar-logo">🎮 GameHub</h1>
      <ul className="navbar-links">
        {links.map((link) => (
          <li
            key={link.path}
            // clase 'active' para resaltar ruta actual
            className={location.pathname === link.path ? 'active' : ''}
          >
            <Link to={link.path}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
