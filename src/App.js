import { registerRootComponent } from 'expo';
import React from 'react';
import { Cadastro } from './screens/Cadastro';
import { Login } from './screens/Login';

export default function App() {
  return <Login />;
}

registerRootComponent(App);