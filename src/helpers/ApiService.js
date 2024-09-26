// src/services/apiService.js
const API_URL = "http://localhost:3000/api/usuarios"; // URL base de la API

const token = localStorage.getItem("token"); // No es necesario JSON.parse si es solo un string

// Editar un usuario
export const editarUsuario = async (id, data) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-token": token, // Añades el token directamente
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

// Eliminar un usuario (cambiar estado)
export const eliminarUsuario = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "x-token": token, // Token JWT
    },
  });
  return response.json();
};

// Buscar usuarios
export const buscarUsuario = async (nombre) => {
  const response = await fetch(`${API_URL}/buscar?nombre=${nombre}`, {
    method: "GET",
    headers: {
      "x-token": token, // Token JWT
    },
  });
  return response.json();
};

// Enviar solicitud de contacto

// Enviar solicitud de contacto
export const enviarSolicitud = async (contactoId) => {
    const response = await fetch(`${API_URL}/${contactoId}/enviar-solicitud`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-token': token,
      },
      body: JSON.stringify({ contactoId }), // Estructura correcta del cuerpo
    });
  
    // Manejo de respuesta
    if (!response.ok) {
      const errorData = await response.json(); // Obtén el cuerpo del error
      throw new Error(errorData.mensaje || "Error al enviar solicitud"); // Mensaje de error
    }
  
    return await response.json(); // Retorna la respuesta en caso de éxito
  };
  
  
  
  export const aceptarSolicitud = async (contactoId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/usuarios/${contactoId}/aceptar-solicitud`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-token': token, // Asegúrate de enviar el token de autorización
        },
        body: JSON.stringify({ contactoId }), // Envía el ID del contacto
      });

      if (!response.ok) {
        throw new Error('Error al aceptar la solicitud');
      }
  
      const data = await response.json();
      alert(data.mensaje); // Muestra el mensaje devuelto por la API
  
      // Actualiza el estado de 'solicitudes' eliminando la que fue aceptada
      setSolicitudes(prev => prev.filter(s => s.usuario._id !== contactoId));
    } catch (error) {
      console.error('Error al aceptar la solicitud:', error);
      alert('Error al aceptar la solicitud');
    }
  };
  
  



// Rechazar solicitud de contacto
export const rechazarSolicitud = async (id, contactoId) => {
  const response = await fetch(`${API_URL}/${id}/rechazar-solicitud`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": token, // Token JWT
    },
    body: JSON.stringify({ contactoId }),
  });
  return response.json();
};


// src/services/apiService.js

// Obtener mensajes
export const obtenerMensajes = async (receptorId) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/api/chat/${receptorId}`, {
      method: "GET",
      headers: {
        "x-token": token,
      },
    });
    return response.json();
  };
  
  // Enviar mensaje
  export const enviarMensaje = async (receptor, mensaje) => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/api/chat/enviar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify({ receptor, mensaje }),
    });
    return response.json();
  };
  
// src/services/apiService.js

// Obtener contactos
export const obtenerContactos = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/api/usuarios/contactos", {
      method: "GET",
      headers: {
        "x-token": token,
      },
    });
    return response.json();
  };



  
// src/helpers/ApiService.js

export const obtenerSolicitudes = async () => {
  const response = await fetch('http://localhost:3000/api/usuarios/solicitudes', {
    method: 'GET',
    headers: {
      'x-token': token,
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener solicitudes');
  }

  const data = await response.json();
  return data; // Devuelve las solicitudes
};
