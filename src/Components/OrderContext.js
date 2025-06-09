import React, { createContext, useState } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderProducts, setOrderProducts] = useState([]);

  const addToOrder = (id) => {
    setOrderProducts((prev) => {
      if (!prev.includes(id)) {
        return [...prev, id];
      }
      return prev;
    });
  };

  return (
    <OrderContext.Provider value={{ orderProducts, addToOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
