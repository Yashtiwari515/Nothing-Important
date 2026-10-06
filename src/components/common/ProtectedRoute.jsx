import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Auth state abhi check ho rahi hai
  if (loading) {
    return <div className="chat-loading">Checking session...</div>;
  }

  // Login nahi hai
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Login hai
  return children;
}

export default ProtectedRoute;