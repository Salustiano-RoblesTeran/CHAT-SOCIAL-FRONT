export const obtenerMensajes = async (chatId) => {
    const token = localStorage.getItem("token"); // Obtener el token del localStorage
  
    if (!token) {
      throw new Error('No se encontró el token de autenticación');
    }
  
    try {
      const resp = await fetch(`http://localhost:3000/api/chat/mensajes/${chatId}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "x-token": token, // Añade el token en los headers
        }
      });
      
      if (!resp.ok) {
        throw new Error('Error al obtener los mensajes');
      }
      
      const data = await resp.json();
        // Si la respuesta contiene un array de mensajes en data.mensajes
        return data.mensajes; // Asegúrate de que esto refleja la estructura de tu respuesta

      return data;
    } catch (error) {
      console.log('Error al obtener los mensajes:', error);
      throw error;
    }
  };
  