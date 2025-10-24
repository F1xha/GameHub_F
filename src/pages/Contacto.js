// pages/Contacto.js
// Formulario simple con alert al enviar
import React from 'react';

export default function Contacto(){
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Formulario enviado!');
  };

  return (
    <div>
      <h1>Contacto</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth:400 }}>
        <div style={{ marginBottom:12 }}>
          <label>Nombre:</label>
          <input type="text" name="nombre" required style={{ width:'100%' }}/>
        </div>
        <div style={{ marginBottom:12 }}>
          <label>Email:</label>
          <input type="email" name="email" required style={{ width:'100%' }}/>
        </div>
        <div style={{ marginBottom:12 }}>
          <label>Mensaje:</label>
          <textarea name="mensaje" required style={{ width:'100%' }} />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
