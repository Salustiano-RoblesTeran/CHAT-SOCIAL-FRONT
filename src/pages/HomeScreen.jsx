// src/screens/HomeScreen.js
import React from 'react';
import NavBar from '../components/NavBar';
import EditarUsuario from '../pages/EditarUsuario';
import BuscarUsuario from '../pages/BuscarUsuario';

const HomeScreen = () => {
  const token = "tu-token-jwt"; // Reemplaza con la lógica para obtener el token
  const userId = "id-del-usuario"; // Reemplaza con el ID del usuario

  return (
    <div className="container-fluid p-0" style={{ height: '100vh' }}>
      <NavBar />
      <div className="container mt-3">
        <h5 className="mb-3">Gestión de Usuarios</h5>
        <EditarUsuario userId={userId} token={token} />
        <BuscarUsuario token={token} />
      </div>
    </div>
  );
};

export default HomeScreen;
