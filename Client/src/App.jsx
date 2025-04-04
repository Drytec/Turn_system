import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {ServiciosPage} from './pages/ServiciosPage';
import {UsuarioEnterPage} from './pages/UsuarioEnterPage';
import { Navigation } from './components/Navigation';

function App() {
  return (
    <BrowserRouter>
    <Navigation/>
      <Routes>
        <Route path="/" element={<Navigate to="/usuario-enter" />} />
        <Route path="/usuario-enter" element={<UsuarioEnterPage />} />
        <Route path="/servicios" element={<ServiciosPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
