import React from 'react';
import {AuthProvider} from './src/contextAPI/AuthContext';
import {AppStateProvider} from './src/contextAPI/AppStateProvider';
import Routes from './src/navigation/Routes';

const App = () => {
  return (
    <AuthProvider>
      <AppStateProvider>
        <Routes />
      </AppStateProvider>
    </AuthProvider>
  );
};

export default App;
