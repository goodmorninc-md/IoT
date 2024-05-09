import { useState, createContext } from "react";

export const ProductContext = createContext(null);

export const ProductContextProvider = ({ children }) => {
  //* currentProduct设置为对象
  const [currentProduct, setCurrentProduct] = useState( {
    id: "6bd185f99fb725b27d8edc12",
    name: "string",
    description: "string",
    type: 1,
    status: 1,
    organization: "6bd185f99fb725b27d8edc12",
  });
  const [productList, setProductList] = useState([
    {
      id: "6bd185f99fb725b27d8edc12",
      name: "string",
      description: "string",
      type: 1,
      status: 1,
      organization: "6bd185f99fb725b27d8edc12",
    },
  ]);
  return (
    <ProductContext.Provider
      value={{
        currentProduct,
        setCurrentProduct,
        productList,
        setProductList,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
