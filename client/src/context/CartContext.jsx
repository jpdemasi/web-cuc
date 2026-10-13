import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('cuc_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cuc_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (producto, talle) => {
    setCart((prev) => {
      const index = prev.findIndex(
        (item) => item.id === producto.id && item.talle === talle
      );
      if (index !== -1) {
        const updated = [...prev];
        updated[index].cantidad += 1;
        return updated;
      }
      return [...prev, { ...producto, talle, cantidad: 1 }];
    });
    setIsOpen(true);
  };

  // Incrementar en 1
  const incrementItem = (id, talle) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.talle === talle
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  };

  // Decrementar en 1 (si queda en 0, se remueve)
  const decrementItem = (id, talle) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.talle === talle) {
            return { ...item, cantidad: item.cantidad - 1 };
          }
          return item;
        })
        .filter((item) => item.cantidad > 0)
    );
  };

  const removeFromCart = (id, talle) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.talle === talle))
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        setIsOpen,
        addToCart,
        incrementItem,
        decrementItem,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
