import { useState, createContext } from "react";

export const FirmwareContext = createContext(null);

export const FirmwareContextProvider = ({ children }) => {
  //* currentProduct设置为对象
  const [currentFirmware, setCurrentFirmware] = useState({});

  return (
    <FirmwareContext.Provider
      value={{
        currentFirmware,
        setCurrentFirmware,
      }}
    >
      {children}
    </FirmwareContext.Provider>
  );
};
