import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authLogin, authRegistro } from '../helpers/ApiLogin';

const LoginScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState('');
  const [formData, setFormData] = useState({ correo: '', password: '' });
  const [registerData, setRegisterData] = useState({ nombre: '', correo: '', password: '' });
  const [registerAlertMessage, setRegisterAlertMessage] = useState(null);
  const [registerAlertType, setRegisterAlertType] = useState('');

  const navigate = useNavigate();


    // Si el usuario está autenticado, redirigirlo fuera de la pantalla de login
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        navigate('/home'); // Redirigir al home o dashboard
      }
    }, [navigate]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
    
    // Limpiar el mensaje de error cuando el usuario empieza a escribir
    setRegisterAlertMessage(null);
  };

  // Manejo del submit para iniciar sesión
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await authLogin(formData);

    if (data.token) {
      setAlertType('success');
      setAlertMessage('Inicio de sesión exitoso.');
      localStorage.setItem('token', data.token);  // Guarda el token
      navigate('/home');  // Redirige al HomeScreen
    } else {
      setAlertType('danger');
      setAlertMessage('Error en el inicio de sesión: ' + (data.msg || data.message));
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const { data, status } = await authRegistro(registerData);
  
      console.log("Respuesta del backend:", { data, status });
  
      if (status === 200) {
        setRegisterAlertType('success');
        setRegisterAlertMessage('Registro exitoso, ahora puedes iniciar sesión.');
        // Espera 5 segundos antes de cerrar el modal
        setTimeout(() => {
          setShowModal(false);

          // Limpiamos el formulario de registro
          setRegisterData({nombre: '', correo: '', password: ''});

          // Limpia los mensajes de alerta
          setRegisterAlertMessage(null);
          setRegisterAlertType('');
        }, 3000);  // 5000 milisegundos = 5 segundos
        
      } else if (status === 400) {
        const errorMessage = data?.errors?.[0]?.msg|| "Nombre o Correo en uso.";
        setRegisterAlertType('danger');
        setRegisterAlertMessage(errorMessage);
      } else {
        setRegisterAlertType('danger');
        setRegisterAlertMessage('Error inesperado al registrarse.');
      }
  
    } catch (error) {
      console.error("Error en el registro:", error);
      setRegisterAlertType('danger');
      setRegisterAlertMessage('Error en el registro: ' + (error.message || "Error desconocido"));
    }
  };
  
  



  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow-lg" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>

        {/* Mostrar alertas */}
        {alertMessage && (
          <div className={`alert alert-${alertType}`} role="alert">
            {alertMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="correo" className="form-label">Correo</label>
            <input
              type="email"
              className="form-control"
              id="correo"
              name="correo"
              placeholder="Correo"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
        </form>

        <div className="mt-3 text-center">
          <p>¿No tienes una cuenta?</p>
          <button className="btn btn-outline-secondary" onClick={() => setShowModal(true)}>
            Crear cuenta
          </button>
        </div>
      </div>

      {/* Modal para crear cuenta */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Crear Cuenta</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                {/* Mostrar alertas del registro */}
                {registerAlertMessage && (
                  <div className={`alert alert-${registerAlertType}`} role="alert">
                    {registerAlertMessage}
                  </div>
                )}
                <form onSubmit={handleRegisterSubmit}>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      name="nombre"
                      placeholder="Nombre"
                      value={registerData.nombre}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="correoRegistro" className="form-label">Correo</label>
                    <input
                      type="email"
                      className="form-control"
                      id="correoRegistro"
                      name="correo"
                      placeholder="Correo"
                      value={registerData.correo}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="passwordRegistro" className="form-label">Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      id="passwordRegistro"
                      name="password"
                      placeholder="Contraseña"
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Registrarse</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginScreen;
