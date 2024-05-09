import { useState, createContext } from "react";

export const CustormerContext = createContext(null);

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
