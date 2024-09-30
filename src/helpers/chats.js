const url = `http://localhost:3000/api/chat/chats`; // Asegúrate de que esta ruta exista en tu backend

const token = localStorage.getItem("token"); // No es necesario JSON.parse si es solo un string

// Traer Chats
export const getChats = async () => {
    try {
        const resp = await fetch(url, {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              "x-token": token, // Añades el token directamente
            }
        });
        if (!resp.ok) {
            throw new Error('Error en la solicitud');
        }
        const data = await resp.json();
        console.log(data)
        return data;

    } catch (error) {
        console.log(error);
        throw new Error("No se pudo obtener la información");
    }
}
