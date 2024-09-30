import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { buscarUsuario } from '../helpers/ApiService'; // Importa la función de búsqueda de la API

const Navbar = ({ nombre }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(''); // Estado para manejar la búsqueda
  const [usuarios, setUsuarios] = useState([]); // Estado para manejar los usuarios encontrados
  const [showResults, setShowResults] = useState(false); // Controla si mostrar o no los resultados de búsqueda

  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token
    navigate('/login'); // Redirigir al login
  };

  // Función para manejar la búsqueda de usuarios
  const handleBuscar = async (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página
    try {
      const response = await buscarUsuario(searchQuery); // Llamada a la API para buscar usuarios por nombre
      const usuariosConEstado = response.usuarios.map((usuario) => ({
        ...usuario,
        estadoSolicitud: usuario.solicitudesPendientes?.find(
          (solicitud) => solicitud.usuario === usuario._id
        )?.estado || '',
      }));
      setUsuarios(usuariosConEstado);
      setShowResults(true); // Mostrar resultados cuando haya búsqueda
    } catch (error) {
      console.error('Error al buscar usuario:', error);
      alert('Error al buscar usuario');
    }
  };

  // Función para cerrar el modal de resultados de búsqueda
  const handleCloseResults = () => {
    setShowResults(false);
    setSearchQuery('');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">ChatSocial</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/notificaciones">Notificaciones</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contactos">Mis Contactos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/editarUsuario">Editar Perfil</Link>
              </li>
            </ul>

            {/* Formulario de búsqueda */}
            <form className="d-flex" role="search" onSubmit={handleBuscar}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar usuarios"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                Buscar
              </button>
            </form>

            {/* Botón de cierre de sesión */}
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <button className="btn btn-danger" onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              </li>
              <span className="navbar-text me-3">
                {nombre.nombre}
              </span>
            </ul>
          </div>
        </div>
      </nav>

      {/* Modal de resultados de búsqueda */}
      {showResults && (
        <div
          className="search-results-modal"
          style={{
            position: 'absolute',
            top: '56px', // Justo debajo del navbar
            left: '0',
            width: '100%',
            height: 'auto',
            backgroundColor: '#fff',
            zIndex: '1000',
            border: '1px solid #ccc',
            borderRadius: '0 0 10px 10px',
            padding: '10px',
            maxHeight: '300px',
            overflowY: 'scroll'
          }}
        >
          {/* Botón para cerrar el modal */}
          <div className="d-flex justify-content-end">
            <button className="btn btn-danger" onClick={handleCloseResults}>
              X
            </button>
          </div>

          {/* Resultados de búsqueda */}
          {usuarios.length > 0 ? (
            <ul className="list-group">
              {usuarios.map((usuario) => (
                <li key={usuario._id} className="list-group-item">
                  {usuario.nombre} - {usuario.correo}
                </li>
              ))}
            </ul>
          ) : (
            <p>No se encontraron usuarios</p>
          )}
        </div>
      )}

      {/* Modal responsive para pantallas pequeñas */}
      {showResults && window.innerWidth < 768 && (
        <div
          className="search-results-modal-fullscreen"
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
            zIndex: '2000',
            padding: '20px',
            overflowY: 'scroll'
          }}
        >
          {/* Botón para cerrar el modal */}
          <div className="d-flex justify-content-end">
            <button className="btn btn-danger" onClick={handleCloseResults}>
              X
            </button>
          </div>

          {/* Resultados de búsqueda */}
          {usuarios.length > 0 ? (
            <ul className="list-group">
              {usuarios.map((usuario) => (
                <li key={usuario._id} className="list-group-item">
                  {usuario.nombre} - {usuario.correo}
                </li>
              ))}
            </ul>
          ) : (
            <p>No se encontraron usuarios</p>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
