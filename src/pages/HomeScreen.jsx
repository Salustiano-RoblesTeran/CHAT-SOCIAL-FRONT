import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { getChats } from '../helpers/chats'; // Asegúrate de que la ruta sea correcta
import { obtenerNombre } from '../helpers/ApiService'; // Asegúrate de que la ruta sea correcta

const HomeScreen = () => {
  const [nombre, setNombre] = useState(''); // Estado para el nombre del usuario
  const [chats, setChats] = useState([]); // Estado para almacenar los chats

  // Función para obtener el nombre del usuario
  const fetchNombre = async () => {
    try {
      const nombreObtenido = await obtenerNombre();
      setNombre(nombreObtenido); // Establecer el nombre en el estado
    } catch (error) {
      console.error('Error al obtener el nombre:', error.message); // Manejo de errores
    }
  };

// Función para obtener los chats
const fetchChats = async () => {
  try {
    const data = await getChats();
    setChats(data.chats); // Acceder a la propiedad 'chats' del objeto de respuesta
  } catch (error) {
    console.error('Error al obtener los chats:', error.message); // Manejo de errores
  }
};



  // Llamar a fetchNombre y fetchChats cuando se monta el componente
  useEffect(() => {
    fetchNombre();
    fetchChats();
  }, []);

  return (
    <div className="container-fluid p-0" style={{ height: '100vh' }}>
      <NavBar nombre={nombre} />
      <div className="container mt-3">
        <h3>Mis Chats</h3>
        <ul className="list-group">
          {chats.length > 0 ? (
            chats.map((chat) => (
              <li key={chat._id} className="list-group-item">
                <div className="d-flex justify-content-between">
                  <div>
                    <h5>{chat.participantes.nombre}</h5>
                    <p className="mb-0">{chat.ultimoMensaje?.contenido || 'Sin mensajes aún'}</p>
                  </div>
                  <small className="text-muted">
                    {chat.ultimoMensaje?.hora
                      ? new Date(chat.ultimoMensaje.hora).toLocaleTimeString()
                      : ''}
                  </small>
                </div>
              </li>
            ))
          ) : (
            <p>No tienes chats aún.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default HomeScreen;
