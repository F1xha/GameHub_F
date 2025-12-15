import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/navbar.css'; // Asegúrate de que la ruta a tus estilos sea correcta

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">GameHub</Link>
      </div>
      
      <ul className="navbar-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/catalogo">Catálogo</Link></li>
        <li><Link to="/sobre-nosotros">Nosotros</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
      </ul>

      <div className="navbar-auth">
        {/* Enlace al Panel de Administración */}
        <Link to="/admin" style={{ marginRight: '15px', color: '#ff9800', fontWeight: 'bold', textDecoration: 'none' }}>
          ⚙️ Admin
        </Link>
        
        <Link to="/perfil" className="btn-perfil">
          Mi Perfil
        </Link>
      </div>
    </nav>
  );
}