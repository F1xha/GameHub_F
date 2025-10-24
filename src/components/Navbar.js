import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navbar.css';

export default function Navbar() {
  const location = useLocation();

  const links = [
    { path: '/', label: 'Inicio' },
    { path: '/catalogo', label: 'Catálogo' },
    { path: '/sobre-nosotros', label: 'Sobre Nosotros' },
    { path: '/contacto', label: 'Contacto' },
    { path: '/perfil', label: 'Perfil' },
  ];

  return (
    <nav className="navbar">
      <h1 className="navbar-logo">🎮 GameHub</h1>
      <ul className="navbar-links">
        {links.map((link) => (
          <li key={link.path} className={location.pathname === link.path ? 'active' : ''}>
            <Link to={link.path}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
