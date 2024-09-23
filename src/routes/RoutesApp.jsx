import { Routes, Route } from "react-router-dom";

const RoutesApp = () => {
    return (
        <>
          <NavbarApp cerrarSesion={cerrarSesion} user={user} />
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            {/* <Route path="/about" element={<AboutScreen />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoutesAdmin user={user}>
                  <AdminScreen />
                </ProtectedRoutesAdmin>
              }
            /> */}
            <Route path="*" element={<ErrorScreen />} />
          </Routes>
          <FooterApp />
        </>
      );
}
export default RoutesApp