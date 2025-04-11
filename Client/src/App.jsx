import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Servicios from './pages/Servicios';
import WelcomePage from './pages/WelcomePage';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/servicios" element={<Servicios />}/>
        <Route path="/registro" element={<Register />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
