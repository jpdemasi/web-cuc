
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

  const addToCart = (producto) => {
    setCart((prev) => {
      const index = prev.findIndex(
        (item) =>
          String(item.id_producto) === String(producto.id_producto)
      );

      if (index !== -1) {
        return prev.map((item, i) =>
          i === index
            ? { ...item, cantidad: Number(item.cantidad) + 1 }
            : item
        );
      }

      return [...prev, { ...producto, cantidad: 1 }];
    });

    setIsOpen(true);
  };

  const incrementItem = (id_producto) => {
    setCart((prev) =>
      prev.map((item) =>
        String(item.id_producto) === String(id_producto)
          ? { ...item, cantidad: Number(item.cantidad) + 1 }
          : item
      )
    );
  };

  const decrementItem = (id_producto) => {
    setCart((prev) =>
      prev
        .map((item) =>
          String(item.id_producto) === String(id_producto)
            ? { ...item, cantidad: Number(item.cantidad) - 1 }
            : item
        )
        .filter((item) => Number(item.cantidad) > 0)
    );
  };

  const removeFromCart = (id_producto) => {
    setCart((prev) =>
      prev.filter(
        (item) => String(item.id_producto) !== String(id_producto)
      )
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
