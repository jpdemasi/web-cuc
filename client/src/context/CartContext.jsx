import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = (producto, talle) => {
    setCart(prev => {
      const index = prev.findIndex(item => item.id === producto.id && item.talle === talle);
      if (index > -1) {
        const next = [...prev];
        next[index].cantidad += 1;
        return next;
      }
      return [...prev, { ...producto, talle, cantidad: 1 }];
    });
    setIsOpen(true);
  };

  const removeFromCart = (id, talle) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.talle === talle)));
  };

  const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, total, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
