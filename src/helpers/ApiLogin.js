// ApiLogin.js
const urlLogin = "http://localhost:3000/api/auth/login";
const urlRegistro = "http://localhost:3000/api/auth/registro";

const authLogin = async (datos) => {
  try {
    const resp = await fetch(urlLogin, {
      method: "POST",
      body: JSON.stringify(datos),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const data = await resp.json();
    return data;  // Devuelve los datos de la respuesta
  } catch (error) {
    console.log(error);
    return { msg: "No se conectó con backend" };
  }
};

const authRegistro = async (registerData) => {
  try {
    const response = await fetch(urlRegistro, {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(registerData),
    });
    

    const data = await response.json();

    // Aquí devolvemos tanto los datos como el estado de la respuesta
    return { data, status: response.status };

  } catch (error) {
    console.error('Error en authRegistro:', error);
    return { msg: 'Error en el servidor', status: 500 };
  }
};

export { authLogin, authRegistro };
