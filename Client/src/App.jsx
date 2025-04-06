import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Servicios from './pages/Servicios';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/servicios" element={<Servicios />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
