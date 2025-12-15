import React, { useEffect, useState } from 'react';
import { getJuegos, deleteJuego, createJuego, updateJuego } from '../services/api';
import { obtenerJuegos, agregarJuego } from '../services/api';
export default function Admin() {
  const [juegos, setJuegos] = useState([]);
  // 1. Agregamos 'genre' al estado
  const [form, setForm] = useState({ id: '', title: '', description: '', rating: '', image: '', genre: '' });
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    const data = await getJuegos();
    setJuegos(data || []);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Procesamos el género: de texto "RPG, Acción" a lista ["RPG", "Acción"]
    const listaGeneros = form.genre.split(',').map(g => g.trim()).filter(g => g !== '');

    const juegoData = {
        title: form.title,
        description: form.description,
        rating: parseFloat(form.rating),
        images: { cover: form.image || "https://placehold.co/600x400?text=Sin+Imagen" },
        genre: listaGeneros // 2. Enviamos la lista a la API
    };

    if (editando) {
      await updateJuego(form.id, juegoData);
      alert('Juego actualizado');
    } else {
      await createJuego(juegoData); 
      alert('Juego creado');
    }
    
    // Limpiamos
    setForm({ id: '', title: '', description: '', rating: '', image: '', genre: '' });
    setEditando(false);
    cargarDatos();
  };

  const handleEditar = (juego) => {
    setForm({
        id: juego.id,
        title: juego.title,
        description: juego.description || '',
        rating: juego.rating || 0,
        image: juego.images?.cover || '',
        // 3. Convertimos la lista de vuelta a texto para editar
        genre: juego.genre ? juego.genre.join(', ') : ''
    });
    setEditando(true);
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Seguro que quieres borrar este juego?")) {
      await deleteJuego(id);
      cargarDatos();
    }
  };

  return (
    <div style={{ padding: 20, color: 'white', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Panel de Administración</h1>
      
      {/* Formulario */}
      <div style={{ background: '#222', padding: 20, borderRadius: 10, marginBottom: 20 }}>
        <h3>{editando ? 'Editar Juego' : 'Agregar Nuevo Juego'}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          
          {/* Columna Izquierda */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input name="title" placeholder="Título" value={form.title} onChange={handleChange} required style={{padding:8}}/>
            <input name="image" placeholder="URL Imagen" value={form.image} onChange={handleChange} style={{padding:8}}/>
            <input name="genre" placeholder="Géneros (ej: RPG, Acción)" value={form.genre} onChange={handleChange} style={{padding:8}}/>
            <input name="rating" type="number" step="0.1" placeholder="Rating (1-5)" value={form.rating} onChange={handleChange} style={{padding:8}}/>
          </div>

          {/* Columna Derecha */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <textarea name="description" placeholder="Descripción" value={form.description} onChange={handleChange} style={{padding:8, height: '100%', minHeight: 80, fontFamily: 'sans-serif'}}/>
          </div>

          {/* Botones (ocupan todo el ancho) */}
          <div style={{ gridColumn: '1 / -1', display:'flex', gap:10, marginTop: 10 }}>
             <button type="submit" style={{ flex:1, padding: 10, background: editando ? 'orange' : 'green', color: 'white', border:'none', cursor:'pointer', fontWeight: 'bold' }}>
                {editando ? 'Guardar Cambios' : 'Crear Juego'}
             </button>
             {editando && (
                <button type="button" onClick={() => {setEditando(false); setForm({id:'', title:'', description:'', rating:'', image:'', genre:''})}} style={{ padding: 10, cursor:'pointer' }}>
                    Cancelar
                </button>
             )}
          </div>
        </form>
      </div>

      {/* Lista */}
      <h3>Lista de Juegos ({juegos.length})</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 10, background: '#1a1a1a', fontSize: '0.9rem' }}>
        <thead>
          <tr style={{ background: '#333' }}>
            <th style={{padding:10}}>Img</th>
            <th style={{padding:10, textAlign:'left'}}>Título</th>
            <th style={{padding:10, textAlign:'left'}}>Género</th>
            <th style={{padding:10, textAlign:'center'}}>Rating</th>
            <th style={{padding:10, textAlign:'center'}}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {juegos.map(j => (
            <tr key={j.id} style={{ borderBottom: '1px solid #444' }}>
              <td style={{padding:10, textAlign: 'center'}}>
                  <img src={j.images?.cover} alt="cover" style={{width:40, height:40, objectFit:'cover', borderRadius:4}}/>
              </td>
              <td style={{padding:10}}>{j.title}</td>
              <td style={{padding:10, color: '#aaa'}}>{j.genre?.join(', ')}</td>
              <td style={{padding:10, textAlign:'center', color: '#ffd700'}}>⭐ {j.rating}</td>
              <td style={{padding:10, textAlign:'center'}}>
                <button onClick={() => handleEditar(j)} style={{ marginRight: 10, cursor:'pointer', border: 'none', background: 'transparent', fontSize: '1.2rem' }} title="Editar">✏️</button>
                <button onClick={() => handleEliminar(j.id)} style={{ cursor:'pointer', border: 'none', background: 'transparent', fontSize: '1.2rem' }} title="Borrar">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}