import React, { createContext, useState, useEffect } from "react";
import api from "../Services/commonApi";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(null);

  const [newLogin, setNewLogin] = useState({
    username: "",
    password: "",
  });


  const getData = () => {
    const responseData = api("get", "http://localhost:3000/products");
    responseData.then((res) => setProducts(res));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        getData,
        newLogin,
        setNewLogin,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
