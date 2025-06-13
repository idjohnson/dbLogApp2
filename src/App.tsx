import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LoginScreen } from './screens/LoginScreen';
import { ListScreen } from './screens/ListScreen';

const AppContent = (): JSX.Element => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <ListScreen /> : <LoginScreen />;
};

export const App = (): JSX.Element => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};