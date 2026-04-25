import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';
import { inicializarDB } from './src/db/database';

export default function App() {
  useEffect(() => {
    inicializarDB();
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}