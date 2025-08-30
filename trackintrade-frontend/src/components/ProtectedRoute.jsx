// src/components/ProtectedRoute.jsx (Simplified version)
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Get user from context

  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};
export default ProtectedRoute;