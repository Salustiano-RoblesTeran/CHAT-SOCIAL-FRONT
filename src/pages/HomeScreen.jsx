import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom'; // Cambiar a useNavigate
import { getChats } from '../helpers/chats'; // Asegúrate de que la ruta sea correcta
import { obtenerNombre } from '../helpers/ApiService'; // Asegúrate de que la ruta sea correcta

const HomeScreen = () => {
  const [nombre, setNombre] = useState(''); // Estado para el nombre del usuario
  const [chats, setChats] = useState([]); // Estado para almacenar los chats

  const navigate = useNavigate(); // Hook para manejar la navegación

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
      const chatsObtenidos = await getChats();
      setChats(chatsObtenidos.chats); // Guardar los chats en el estado
    } catch (error) {
      console.error('Error al obtener los chats:', error.message); // Manejo de errores
    }
  };

  // Llamar a fetchNombre y fetchChats cuando se monta el componente
  useEffect(() => {
    fetchNombre();
    fetchChats();
  }, []);

    // Función para manejar la navegación al chat
    const handleChatClick = (contactoId) => {
      navigate(`/chat/conversacion/${contactoId}`); // Cambiar history.push a navigate
    };

  return (
    <div className="container-fluid p-0" style={{ height: '100vh' }}>
      <NavBar nombre={nombre} />
      <div className="container mt-3">
        <h3>Mis Chats</h3>
        <ul className="list-group">
          {chats.length > 0 ? (
            chats.map((chat) => (
              <li key={chat._id} className="list-group-item" onClick={() => handleChatClick(chat._id)}>
                <div className="d-flex justify-content-between">
                  <div>
                    <h5>{chat.otroUsuarioNombre}</h5> {/* Mostrar el nombre del otro usuario */}
                    <p className="mb-0">{chat.ultimoMensaje || 'Sin mensajes aún'}</p> {/* Último mensaje */}
                    <small className={chat.leido ? "text-success" : "text-danger"}>
                      {chat.leido ? "Leído" : "No leído"}
                    </small> {/* Estado leído o no leído */}
                  </div>
                  <small className="text-muted">
                    {chat.horaUltimoMensaje
                      ? new Date(chat.horaUltimoMensaje).toLocaleTimeString()
                      : ''}
                  </small> {/* Hora del último mensaje */}
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
