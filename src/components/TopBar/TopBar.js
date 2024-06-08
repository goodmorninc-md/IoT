import MyDropDown from "@/components/Dropdown/dropdown";
import React from "react";
import { useState, useRef, useContext, useEffect } from "react";
import MyToast from "../Toast/toast";
import { GetOrganizationList } from "@/services/Organization";

import { OrganizationContext } from "@/context/Organization";
import { AuthContext } from "@/context/AuthContext";

import { Divider } from "@arco-design/mobile-react";

import "@/styles/home.less";
import "@/styles/topbar.less";
import { ProductContext } from "@/context/Product";

export default function MyTopBar({ LeftChildren, children, content }) {
  const { current_Organization } =
    useContext(OrganizationContext);
  const [OrganizationList, setOrganizationList] = useState([]);
  const { currentProduct, setCurrentProduct } = useContext(ProductContext);
  //获取到设置的状态
  const { authState } = useContext(AuthContext);
  useEffect(() => {
    GetOrganizationList().then((data) => {
      setOrganizationList(data);
    }).catch(error=>{
      MyToast("error","获取组织列表失败")
    });;
  }, []);

  //* 初次渲染先请求组织列表和首页的数据
  //todo 考虑请求失败后返回的值造成的影响
  // console.log(content);

  return (
    <>
      <div className="ps">
        {LeftChildren === undefined ? (
          <span className="Bu"></span>
        ) : (
          React.cloneElement(LeftChildren, { className: "sideBar" })
        )}

        <span className="spacer">
          {/* {"绿源天然气有限公司"} */}
          {content !== undefined ? content : current_Organization.name}
        </span>
        {children === undefined ? <span className="Bu"></span> : children}
      </div>
      <Divider
        style={{ color: "black", borderColor: "black", borderStyle: "dashed" }}
      ></Divider>
    </>
  );
}
