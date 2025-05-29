import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import NotesPage from './pages/NotesPage';

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/notes" element={user ? <NotesPage /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/notes" />} />
    </Routes>
  );
}

export default App;
