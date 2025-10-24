import React from 'react';

export default function Contacto(){
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Gracias por contactarnos! Te responderemos pronto.');
  };

  return (
    <div>
      <h1>Contáctanos</h1>
      <p>¿Tienes dudas o sugerencias? Completa el formulario y te responderemos.</p>

      <form onSubmit={handleSubmit} style={{ maxWidth:500, marginTop:20 }}>
        <label>Nombre</label>
        <input type="text" name="nombre" required style={{ width:'100%', marginBottom:10 }}/>

        <label>Email</label>
        <input type="email" name="email" required style={{ width:'100%', marginBottom:10 }}/>

        <label>Mensaje</label>
        <textarea name="mensaje" required style={{ width:'100%', marginBottom:10, height:100 }}/>

        <button type="submit" style={{ background:'#00bfff', color:'#fff', border:'none', padding:'0.6rem 1.2rem', borderRadius:8, cursor:'pointer' }}>
          Enviar Mensaje
        </button>
      </form>
    </div>
  );
}
