// src/screens/ContactosScreen.js
import React, { useEffect, useState } from "react";
import { obtenerContactos } from "../helpers/ApiService"; // Asegúrate de que esta función existe

const ContactosScreen = () => {
  const [contactos, setContactos] = useState([]);

  useEffect(() => {
    const cargarContactos = async () => {
      try {
        const response = await obtenerContactos();
        setContactos(response.contactos);
      } catch (error) {
        console.error("Error al cargar contactos:", error);
      }
    };

    cargarContactos();
  }, []);

  const handleEnviarMensaje = (contactoId) => {
    // Redirigir al chat con el contacto (usando history o un hook de navegación)
    window.location.href = `/chat/${contactoId}`; // Cambia esto según tu configuración de rutas
  };

  return (
    <div className="container mt-3">
      <h3>Mis Contactos</h3>
      <p>Total de Contactos: {contactos.length}</p>
      {contactos.length > 0 ? (
        <ul className="list-group mt-3">
          {contactos.map((contacto) => (
            <li key={contacto._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                {contacto.nombre} - {contacto.correo}
              </div>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleEnviarMensaje(contacto._id)}
              >
                Enviar Mensaje
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes contactos.</p>
      )}
    </div>
  );
};

export default ContactosScreen;
