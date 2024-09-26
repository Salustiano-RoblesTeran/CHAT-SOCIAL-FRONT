import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";
import RoutesApp from "./routes/RoutesApp";

import LoginScreen from "./pages/LoginScreen";
import HomeScreen from "./pages/HomeScreen";
import ChatScreen from "./pages/ChatScreen";
import ContactosScreen from "./pages/ContactosScreen";

import NotificacionesScreen from "./pages/NotificacionesScreen"

function App() {
  // Estados para manejar login y datos de usuario
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(null);

  // Función para guardar datos del usuario autenticado
  const guardarUsuario = (datos) => {
    setUser(datos);
  };

  // Función cuando inicia sesión
  const iniciarSesion = () => {
    setLogin(true);
  };

  // Función cuando cierra sesión
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

        {/* Ruta de Login que recibe función para iniciar sesión y guardar datos de usuario */}
        <Route
          path="/login"
          element={
            <LoginScreen
              iniciarSesion={iniciarSesion}
              guardarUsuario={guardarUsuario}
            />
          }
        />

        {/* Rutas para Home, Contactos y Chat */}
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <HomeScreen />
            </ProtectedRoute>
          } 
        />
        <Route path="/contactos" element={<ContactosScreen />} />
        <Route path="/chat/:contactoId" element={<ChatScreen />} />
        <Route path="/chat/mensajes/:chatId" element={<ChatScreen />} />
        <Route path="/notificaciones" element={<NotificacionesScreen />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
