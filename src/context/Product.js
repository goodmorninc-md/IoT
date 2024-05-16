import { useState, createContext, useEffect } from "react";

export const ProductContext = createContext(null);
//* 应该在产品页才初次请求
export const ProductContextProvider = ({ children }) => {
  //* currentProduct设置为对象
  const [currentProduct, setCurrentProduct] = useState({});
  const [productList, setProductList] = useState([]);

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
