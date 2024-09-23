import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";
import RoutesApp from "./routes/RoutesApp";

import LoginScreen from "./pages/LoginScreen";
import HomeScreen from "./pages/HomeScreen";


function App() {
  //Estados para manejar login y datos de usuario
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(null);
  //Función para guardar datos del usuario autenticado
  const guardarUsuario = (datos) => {
    setUser(datos);
  };

  //Función cuando inicia sesión
  const iniciarSesion = () => {
    setLogin(true);
  };
  //Función cuando cierra sesión
  const cerrarSesion = () => {
    setLogin(false);
  };
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas protegidas que reciben login, datos de usuario y función cerrar sesión */}
        <Route
          path="/*"
          element={
            <ProtectedRoute login={login}>
              <RoutesApp cerrarSesion={cerrarSesion} user={user} />
            </ProtectedRoute>
          }
        />

        {/* Ruta de Login que recibe función para iniciar sesión y guardar datos de usuario*/}
        <Route
          path="/login"
          element={
            <LoginScreen
              iniciarSesion={iniciarSesion}
              guardarUsuario={guardarUsuario}
            />
          }
        />

            <Route path="/home" element={
          <ProtectedRoute>
            <HomeScreen />
          </ProtectedRoute>
        }
      />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
