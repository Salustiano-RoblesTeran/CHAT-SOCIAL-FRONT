import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token
    navigate('/login'); // Redirigir al login
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
      <div className="container-fluid">
        <h2 className="navbar-brand">ChatSocial</h2>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <form className="d-flex me-auto">
            <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Buscar" />
            <button className="btn btn-outline-success" type="submit">Buscar</button>
          </form>
          <button className="btn btn-danger" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
