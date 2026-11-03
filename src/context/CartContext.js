import React, { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext();

/**
 * Provider do carrinho de compras
 * Gerencia o estado global dos itens no carrinho
 */
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Adicionar produto ao carrinho (ou incrementar quantidade)
  const addToCart = useCallback((product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  // Remover produto do carrinho
  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  // Atualizar quantidade de um produto
  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== productId));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  // Limpar todo o carrinho
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Calcular total do carrinho
  const getTotal = useCallback(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  // Contar quantidade total de itens
  const getItemCount = useCallback(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/**
 * Hook para acessar o contexto do carrinho
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};

