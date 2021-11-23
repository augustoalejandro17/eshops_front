import React from 'react';
import { AuthProvider } from 'context/AuthContext';
import  RoutesFile from 'navigation/Routes';

const Providers = () => {
  return (
    <AuthProvider>
      <RoutesFile />
    </AuthProvider>
  );
}

export default Providers;