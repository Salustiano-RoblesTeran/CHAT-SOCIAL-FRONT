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
  try {
    const response = await fetch(`${API_URL}/${contactoId}/enviar-solicitud`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-token': token,  // Asegúrate de que el token sea válido y esté disponible
      },
      body: JSON.stringify({ contactoId }), // Enviar el contactoId en el cuerpo de la solicitud
    });

    // Manejo de la respuesta, en caso de que la solicitud no sea exitosa
    if (!response.ok) {
      let errorMessage = "Error al enviar solicitud"; // Mensaje de error por defecto

      // Intenta extraer el mensaje de error del cuerpo de la respuesta (si es un JSON)
      try {
        const errorData = await response.json();
        errorMessage = errorData.mensaje || errorMessage; // Usa el mensaje del backend si está disponible
      } catch (error) {
        console.warn("No se pudo parsear la respuesta de error:", error);
      }

      throw new Error(errorMessage); // Lanza el error con el mensaje adecuado
    }

    // Si la solicitud fue exitosa, parsea la respuesta JSON
    return await response.json();
    
  } catch (error) {
    console.error("Error al enviar la solicitud:", error.message);
    throw error; // Propaga el error para ser manejado en el frontend
  }
};

  
  
  export const aceptarSolicitud = async (contactoId) => {
    try {
      const response = await fetch(`${API_URL}/${contactoId}/aceptar-solicitud`, {
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
export const obtenerChat = async (receptorId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:3000/api/chat/conversacion/${receptorId}`, {
    method: "GET",
    headers: {
      "x-token": token,
    },
  });

  // Verificar si la respuesta es correcta
  if (!response.ok) {
    throw new Error('Error al obtener el chat');
  }

  return response.json(); // Devuelve la respuesta JSON
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
  const url = `http://localhost:3000/api/usuarios/contactos`; // Ajusta la URL según tu backend

  try {
    const resp = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-token": token, // Añades el token para autenticar la solicitud
      },
    });

    if (!resp.ok) {
      throw new Error("Error al obtener los contactos");
    }

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener los contactos");
  }
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

export const obtenerNombre = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'x-token': token, // Asegúrate de que `token` esté definido
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener el nombre del usuario');
    }

    const data = await response.json();
    return data; // Devuelve los datos del usuario (incluyendo el nombre)
    
  } catch (error) {
    console.error(error.message);
    throw new Error('No se pudo obtener el nombre del usuario');
  }
};

