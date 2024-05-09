import MyDropDown from "@/components/Dropdown/dropdown";
import React from "react";
import { useState, useRef, useContext, useEffect } from "react";

import { GetOrganizationList } from "@/services/Organization";

import { OrganizationContext } from "@/context/Organization";
import { AuthContext } from "@/context/AuthContext";

import { Divider } from "@arco-design/mobile-react";

import "@/styles/home.less";

export default function MyTopBar({ LeftChildren = <></>,children }) {
  const {
    current_Organization,
    setCurrentOrganization,
    OrganizationList,
    setOrganizationList,
  } = useContext(OrganizationContext);

  //获取到设置的状态
  const { authState, login, logout } = useContext(AuthContext);
  const token = authState.token;

  //* 初次渲染先请求组织列表和首页的数据
  //todo 考虑请求失败后返回的值造成的影响

  useEffect(() => {
    // 获取所有组织列表
    GetOrganizationList(token).then((data) => {
      //* 父组件的state发生变化，并且通过props传给子组件，会导致子组件也刷新
      data = [{ id: "首页", name: "首页", description: "string" }, ...data];
      setOrganizationList(data);
    });
  }, []);

  const DropDownOnClick = (e,idx) => {
    console.log(idx);
    setCurrentOrganization(e);
  };
  return (
    <>
      <div className="ps">
        {LeftChildren}

        <span className="spacer">
          <MyDropDown
            DropDownElements={OrganizationList}
            DropDownOnClick={DropDownOnClick}
            className={"spacer"}
            initialValue={current_Organization}
          ></MyDropDown>
        </span>
        {children}
      </div>
      <Divider
        style={{ color: "black", borderColor: "black", borderStyle: "dashed" }}
      ></Divider>
    </>
  );
}
