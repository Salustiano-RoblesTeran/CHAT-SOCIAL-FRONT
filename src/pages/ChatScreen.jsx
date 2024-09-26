// src/components/Chat.js
import React, { useState, useEffect } from "react";
import { obtenerMensajes, enviarMensaje } from "../helpers/ApiService"; // Asegúrate de tener estas funciones en tu servicio

const ChatScreen = ({ receptorId }) => {
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState("");

  useEffect(() => {
    const cargarMensajes = async () => {
      try {
        const response = await obtenerMensajes(receptorId);
        setMensajes(response.mensajes);
      } catch (error) {
        console.error("Error al cargar mensajes:", error);
      }
    };

    cargarMensajes();
  }, [receptorId]);

  const handleEnviar = async () => {
    if (!nuevoMensaje.trim()) return;

    try {
      await enviarMensaje(receptorId, nuevoMensaje);
      setMensajes((prevMensajes) => [
        ...prevMensajes,
        { emisor: "tú", mensaje: nuevoMensaje }, // Añade el nuevo mensaje localmente
      ]);
      setNuevoMensaje("");
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
    }
  };

  return (
    <div className="chat-container">
      <div className="mensajes">
        {mensajes.map((msg, index) => (
          <div key={index} className={msg.emisor === "tú" ? "mensaje emisor" : "mensaje receptor"}>
            {msg.mensaje}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={nuevoMensaje}
        onChange={(e) => setNuevoMensaje(e.target.value)}
        placeholder="Escribe un mensaje..."
      />
      <button onClick={handleEnviar}>Enviar</button>
    </div>
  );
};

export default ChatScreen;
