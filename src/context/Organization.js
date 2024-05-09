import { useState, createContext } from "react";

export const OrganizationContext = createContext(null);

export const OrganizationContextProvider = ({ children }) => {
  const [OrganizationList, setOrganizationList] = useState([]);
  const [current_Organization, setCurrentOrganization] = useState("首页");
  return (
    <OrganizationContext.Provider
      value={{
        current_Organization,
        setCurrentOrganization,
        OrganizationList,
        setOrganizationList,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};
