import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuthorization = async () => {
      const token = localStorage.getItem('token');
      const userRole = localStorage.getItem('userRole');

      if (!token) {
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      try {
        // If no specific role is required, just check if user is logged in
        if (!requiredRole) {
          setIsAuthorized(true);
        } else {
          // Check if user has the required role
          setIsAuthorized(userRole === requiredRole);
        }
      } catch (error) {
        console.error('Authorization check failed:', error);
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthorization();
  }, [requiredRole]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthorized) {
    // Redirect to appropriate page based on authentication status
    const token = localStorage.getItem('token');
    return <Navigate to={token ? '/' : '/login'} replace />;
  }

  return children;
};

export default ProtectedRoute;