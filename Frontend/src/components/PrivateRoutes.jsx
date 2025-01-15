import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('accessToken');
  
  if (!token) {
    // Si no hay token, redirige a la página de login
    return <Navigate to="/login" />;
  }

  // Si el usuario tiene un token, renderiza la ruta protegida
  return element;
};

export default PrivateRoute;