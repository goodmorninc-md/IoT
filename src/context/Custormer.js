import { useState, createContext } from "react";

export const CustormerContext = createContext(null);
//* 在产品页跳转至客户详情页时使用，没有url支持
export const CustormerContextProvider = ({ children }) => {
  const [currentCustormer, setCurrentCustormer] = useState({});
  return (
    <CustormerContext.Provider
      value={{
        currentCustormer,
        setCurrentCustormer,
      }}
    >
      {children}
    </CustormerContext.Provider>
  );
};
