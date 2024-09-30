import React, { useState } from "react";
import { buscarUsuario, enviarSolicitud } from "../helpers/ApiService"; // Asumiendo que estas funciones existen en tu ApiService

const BuscarUsuario = () => {
  const [nombre, setNombre] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  // Manejar la búsqueda de usuarios
  const handleBuscar = async () => {
    try {
      const response = await buscarUsuario(nombre); // Llamada a la API para buscar usuarios por nombre

      // Mapea usuarios para incluir el estado de la solicitud si no está definido
      const usuariosConEstado = response.usuarios.map((usuario) => ({
        ...usuario,
        estadoSolicitud: usuario.solicitudesPendientes?.find(
          (solicitud) => solicitud.usuario === usuario._id
        )?.estado || "",
      }));
      setUsuarios(usuariosConEstado);
    } catch (error) {
      console.error("Error al buscar usuario:", error);
      alert("Error al buscar usuario");
    }
  };

  // Manejar el envío de la solicitud de amistad
  const handleEnviarSolicitud = async (contactoId, index) => {
    try {
      const response = await enviarSolicitud(contactoId); // Llamada a la API para enviar solicitud
      if (response.mensaje === "Solicitud de contacto enviada") {
        // Actualiza el estado a "Pendiente" si la solicitud se envió correctamente
        const nuevosUsuarios = [...usuarios];
        nuevosUsuarios[index].estadoSolicitud = "Pendiente";
        setUsuarios(nuevosUsuarios);
      } else {
        alert("La solicitud ya ha sido enviada o ya son contactos");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      alert("Error al enviar la solicitud");
    }
  };

  // Manejar la eliminación de un amigo
  const handleEliminarAmigo = (usuarioId) => {
    alert(`Eliminar amigo con ID: ${usuarioId}`);
    // Aquí deberías implementar la lógica para eliminar un amigo si es necesario
  };

  // Función para renderizar los botones de acción dependiendo del estado de la solicitud
  const renderButton = (usuario, index) => {
    switch (usuario.estadoSolicitud) {
      case "Pendiente":
        return (
          <button className="btn btn-warning btn-sm" disabled>
            Pendiente
          </button>
        );
      case "Aceptado":
        return (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleEliminarAmigo(usuario._id)}
          >
            Eliminar Amigo
          </button>
        );
      default:
        return (
          <button
            className="btn btn-success btn-sm"
            onClick={() => handleEnviarSolicitud(usuario._id, index)}
          >
            Enviar Solicitud
          </button>
        );
    }
  };

  return (
    <div className="container mt-3">
      <h3>Buscar Usuario</h3>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar por nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleBuscar}>
        Buscar
      </button>

      {usuarios.length > 0 && (
        <ul className="list-group mt-3">
          {usuarios.map((usuario, index) => (
            <li
              key={usuario._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                {usuario.nombre} - {usuario.correo}
              </div>
              {renderButton(usuario, index)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BuscarUsuario;
