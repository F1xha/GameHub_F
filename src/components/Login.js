import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../App.css"; // o "../styles/iniciar.css" si usas un archivo separado
import "../Login.css";
function Login() {
  // Estados para guardar los datos del formulario
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  // Función para manejar el clic del botón
  const mostrarAlertaIniciarSesion = () => {
    if (!usuario || !password) {
      alert("Por favor, completa todos los campos.");
    } else {
      alert(`Bienvenido, ${usuario}!`);
    }
  };

  return (
    <div className="LoginPage">
      <Header />

      <main>
        <div className="contenedor">
          <div className="marge">
            <h1>INICIAR SESIÓN</h1>

            {/* Campo de usuario */}
            <div className="form-group">
              <label htmlFor="usuario">Usuario:</label>
              <input
                type="text"
                className="form-control"
                id="usuario"
                placeholder="Escribe tu usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
            </div>

            {/* Campo de contraseña */}
            <div className="form-group">
              <label htmlFor="pwd">Contraseña:</label>
              <input
                type="password"
                className="form-control"
                id="pwd"
                placeholder="Escribe tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Botón para iniciar sesión */}
            <button
              type="button"
              className="btn btn-primary"
              onClick={mostrarAlertaIniciarSesion}
            >
              Iniciar sesión
            </button>
          </div>

          {/* Logo */}
          <div className="logo">
            <img
              src="logo192.png"
              alt="Logo del sitio web"
              width="100"
              height="100"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Login;
