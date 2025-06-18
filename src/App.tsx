import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { LoginScreen } from './screens/LoginScreen';
import { ListScreen } from './screens/ListScreen';

const Logo = () => {
  const { theme } = useTheme();
  
  return (
    <picture className="fixed top-4 right-4 z-50 block w-12 h-12">
      <img 
        src={theme === 'dark' ? '/black_circle_360x360.png' : '/white_circle_360x360.png'} 
        alt="App Logo" 
        className="w-full h-full"
      />
    </picture>
  );
};

const AppContent = (): JSX.Element => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Logo />
      {isAuthenticated ? <ListScreen /> : <LoginScreen />}
    </>
  );
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