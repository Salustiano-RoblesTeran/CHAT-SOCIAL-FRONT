import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../components/NavBar'

const HomeScreen = () => {
  const [chats, setChats] = useState([]);
  const token = localStorage.getItem('token') // Obtiene el token del localStorage
  const userId = 'emisorIdEjemplo'; // Simulación del emisorId (ID del usuario autenticado)

  // Función para obtener los mensajes entre dos usuarios
  const fetchChats = async () => {
    try {
      // Simulación de receptorId (ID del contacto o chat)
      const receptorId = 'receptorIdEjemplo';
      
      const response = await fetch(`http://localhost:3000/api/chat/mensajes/${userId}/${receptorId}`, {
        method: 'GET',
        headers: {
          'x-token': token, // JWT en el encabezado
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        setChats(data); // Almacena los mensajes obtenidos
      } else {
        console.error('Error al obtener los chats:', data);
      }
    } catch (error) {
      console.error('Error en la solicitud de chats:', error);
    }
  };

  // useEffect para cargar los mensajes cuando el componente se monta
  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className="container-fluid p-0" style={{ height: '100vh' }}>
      {/* Barra de navegación superior */}
      <NavBar/>

      {/* Sección de Chats */}
      <div className="container mt-3">
        <h5 className="mb-3">Chats</h5>
        {chats.map(chat => (
          <div key={chat.id} className="card mb-2">
            <div className="card-body d-flex justify-content-between">
              <div>
                <h6 className="mb-0">{chat.emisorId === userId ? 'Tú' : chat.emisorId}</h6>
                <small className="text-muted">{chat.mensaje}</small>
              </div>
              <div>
                <small className="text-muted">{chat.hora}</small>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botón flotante para agregar chats o grupos */}
      <button
        className="btn btn-primary position-fixed"
        style={{
          bottom: '20px',
          right: '20px',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FaPlus size={24} />
      </button>
    </div>
  );
};

export default HomeScreen;
