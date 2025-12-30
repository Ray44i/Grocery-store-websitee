import React, { createContext, useContext, useState } from "react";

// Create Context
export const CartContext = createContext();

// Provider Component
export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  
  // Add product or increase quantity
  
  // quantity defaults to 1 if not provided
  const add = (product, quantity = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevItems, { ...product, quantity }];
    });
  };


  // Decrease quantity (remove if 0)
  
  const decrement = (id) => {
    setItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  
  // Remove product completely
  
  const remove = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  
  // Clear entire cart, backend handle this cuz it will have trigger so it check the amount of the products we have so if its out of stouk it wil inform the owner bfore that 
 
  const clear = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        add,
        decrement,
        remove,
        clear,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Convenience hook
export const useCart = () => useContext(CartContext);
