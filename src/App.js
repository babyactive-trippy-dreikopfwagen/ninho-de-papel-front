import React, { useState } from 'react';
import { Contact } from './screens/Contact';
import { Cadastro } from './screens/Cadastro';
import { Home } from './screens/Home';
import { Login } from './screens/Login';
import { Products } from './screens/Products';
import { Welcome } from './screens/Welcome';

export default function App() {
  const [screen, setScreen] = useState('welcome');
  const [productsCategory, setProductsCategory] = useState('Todas');

  if (screen === 'login') {
    return <Login onNavigate={setScreen} />;
  }

  if (screen === 'register') {
    return <Cadastro onNavigate={setScreen} />;
  }

  if (screen === 'home') {
    return (
      <Home
        onBack={() => setScreen('welcome')}
        onOpenContact={() => setScreen('contact')}
        onOpenProducts={(category) => {
          setProductsCategory(category || 'Todas');
          setScreen('products');
        }}
      />
    );
  }

  if (screen === 'products') {
    return <Products initialCategory={productsCategory} onBack={() => setScreen('home')} />;
  }

  if (screen === 'contact') {
    return <Contact onBack={() => setScreen('home')} />;
  }

  return <Welcome onNavigate={setScreen} />;
}