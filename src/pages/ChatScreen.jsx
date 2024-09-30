import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Importar useParams
import { obtenerChat } from '../helpers/ApiService'; // Asegúrate de que la ruta sea correcta

const ChatScreen = () => {
  const { contactoId } = useParams(); // Obtener contactoId de la URL
  const [chat, setChat] = useState(null); // Estado para almacenar los mensajes del chat
  const [cargando, setCargando] = useState(true); // Estado de carga

  // Función para cargar los mensajes del chat usando el contactoId
  useEffect(() => {
    const cargarChat = async () => {
      try {
        const chatObtenido = await obtenerChat(contactoId); // Usar el contactoId para obtener el chat
        setChat(chatObtenido); // Guardar el chat en el estado
      } catch (error) {
        console.error("Error al cargar el chat:", error.message);
      } finally {
        setCargando(false); // Dejar de mostrar el mensaje de carga
      }
    };

    cargarChat();
  }, [contactoId]); // Ejecutar este efecto cuando cambia contactoId

  if (cargando) {
    return <p>Cargando...</p>; // Mostrar mensaje de carga
  }

  if (!chat) {
    return <p>No se encontró el chat.</p>; // Mostrar mensaje si no hay chat
  }

  return (
    <div>
      <h3>Chat con {chat.otroUsuarioNombre}</h3>
      <ul>
        {chat.mensajes.map((mensaje) => (
          <li key={mensaje._id}>
            <strong>{mensaje.remitenteNombre}:</strong> {mensaje.contenido}
            <small>{new Date(mensaje.createdAt).toLocaleTimeString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatScreen;
