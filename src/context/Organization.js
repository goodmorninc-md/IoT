import { useState, createContext, useEffect, useMemo } from "react";
import { GetOrganizationList } from "@/services/Organization";
import MyToast from "@/components/Toast/toast";
export const OrganizationContext = createContext(null);

//* 全局修改在MytopBar里面
export const OrganizationContextProvider = ({ children }) => {
  const [OrganizationList, setOrganizationList] = useState([]);
  const [current_Organization, setCurrentOrganization] = useState({
    id: "firstPage",
    name: "请选择组织",
    description: "",
  });
  const [currentOrgId, setCurrentOrgId] = useState("");
  useEffect(() => {
    // 获取所有组织列表
    // console.log("organization contexteffect");
    GetOrganizationList()
      .then((data) => {
        //* 父组件的state发生变化，并且通过props传给子组件，会导致子组件也刷新

        let temp = [{ id: "firstPage", name: "请选择组织", description: "" }];
        if (typeof temp === "object") temp = [...temp, data];
        setOrganizationList(temp);
      })
      .catch((error) => {
       
        // console.log(error);
        let temp = [{ id: "firstPage", name: "请选择组织", description: "" }];
        setOrganizationList(temp);
        MyToast("error", error);
      });
  }, []);
  const value = useMemo(
    () => ({
      current_Organization,
      setCurrentOrganization,
      OrganizationList,
      setOrganizationList,
      currentOrgId,
      setCurrentOrgId,
    }),
    [current_Organization, OrganizationList, currentOrgId]
  ); // 依赖项包括所有需要稳定的值
  return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  );
};
