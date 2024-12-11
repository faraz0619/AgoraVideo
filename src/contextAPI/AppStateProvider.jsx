import React, {createContext, useContext, useEffect, useState} from 'react';
import {AppState} from 'react-native';

const AppStateContext = createContext();

export const AppStateProvider = ({children}) => {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = nextAppState => {
      console.log('App State Changed:', nextAppState);
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <AppStateContext.Provider value={appState}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppStateContext);
};
