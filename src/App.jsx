import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";
import RoutesApp from "./routes/RoutesApp";

import LoginScreen from "./pages/LoginScreen";
import HomeScreen from "./pages/HomeScreen";
import ChatScreen from "./pages/ChatScreen";
import ContactosScreen from "./pages/ContactosScreen";

import NotificacionesScreen from "./pages/NotificacionesScreen"
import EditarUsuario from "./pages/EditarUsuario";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        
        {/* Rutas protegidas que reciben login, datos de usuario y función cerrar sesión */}
        <Route path="/*" element={
            <ProtectedRoute>
              <RoutesApp/>
            </ProtectedRoute>
          }/>

        {/* Ruta de Login que recibe función para iniciar sesión y guardar datos de usuario */}
        <Route path="/login"
          element={
            <LoginScreen
            />
          }/>

        {/* Rutas para Home, Contactos y Chat */}
        <Route path="/home" 
          element={
            <ProtectedRoute>
              <HomeScreen />
            </ProtectedRoute>
          }/>
        <Route path="/contactos" element={<ContactosScreen />} />
        <Route path="/editarUsuario" element={<EditarUsuario/>} />
        <Route path="/chat/:contactoId" element={<ChatScreen />} />
        <Route path="/chat/mensajes/:chatId" element={<ChatScreen />} />
        <Route path="/notificaciones" element={<NotificacionesScreen />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
