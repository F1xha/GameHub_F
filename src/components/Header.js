import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>GameHub</h1>
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/login">Iniciar sesión</Link></li>
          <li><Link to="/acerca">Acerca de</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
