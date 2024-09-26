import React, { useEffect, useState } from 'react';
import { obtenerSolicitudes, aceptarSolicitud } from '../helpers/ApiService';

const NotificacionesScreen = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const response = await obtenerSolicitudes();
        setSolicitudes(response);
      } catch (error) {
        console.error('Error al obtener solicitudes:', error);
        alert('Error al cargar las solicitudes');
      }
    };

    fetchSolicitudes();
  }, []);

  const handleAceptarSolicitud = (contactoId) => {
    aceptarSolicitud(contactoId, setSolicitudes); // Pasa setSolicitudes aquí
  };

  return (
    <div className="container mt-3">
      <h3>Notificaciones</h3>
      {solicitudes.length === 0 ? (
        <p>No tienes solicitudes de amistad pendientes.</p>
      ) : (
        <ul className="list-group mt-3">
          {solicitudes.map((solicitud) => (
            <li key={solicitud.usuario._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                {solicitud.usuario.nombre} ({solicitud.usuario.correo}) te ha enviado una solicitud de amistad.
              </div>
              <button
                className="btn btn-success btn-sm"
                onClick={() => handleAceptarSolicitud(solicitud.usuario._id)}
              >
                Aceptar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificacionesScreen;
