import { Routes, Route } from "react-router-dom";
import HomeScreen from '../pages/HomeScreen'
import ErrorScreen from '../pages/ErrorScreen'

const RoutesApp = () => {
    return (
        <>
          <Routes>
            <Route path="/" element={<HomeScreen/>} />
            <Route path="*" element={<ErrorScreen />} />
          </Routes>
        </>
      );
}
export default RoutesApp