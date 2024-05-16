import { useState, createContext, useEffect } from "react";
import { GetOrganizationList } from "@/services/Organization";
export const OrganizationContext = createContext(null);

//* 全局修改在MytopBar里面
export const OrganizationContextProvider = ({ children }) => {
  const [OrganizationList, setOrganizationList] = useState([]);
  const [current_Organization, setCurrentOrganization] = useState({
    id: "firstPage",
    name: "请选择组织",
    description: "",
  });

  useEffect(() => {
    // 获取所有组织列表
    GetOrganizationList().then((data) => {
      //* 父组件的state发生变化，并且通过props传给子组件，会导致子组件也刷新
      data = [
        { id: "firstPage", name: "请选择组织", description: "" },
        ...data,
      ];
      setOrganizationList(data);
    });
  }, []);

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
