import CreateOrg from "@/components/PopupSwiper/CreateOrg";
import { useState, useContext, useRef } from "react";

import { Input } from "@arco-design/mobile-react";
import "@/styles/home.less";
import "@/styles/product.less";
import MyToast from "@/components/Toast/toast";

import { OrganizationContext } from "@/context/Organization";
import { AuthContext } from "@/context/AuthContext";
import { ProductContext } from "@/context/Product";

export default function CreateProductButton({}) {
 
  const addData = useRef({});
  
  const { productList, setProductList } = useContext(ProductContext);
  const { current_Organization } = useContext(OrganizationContext);

  //* 获取到设置登录状态
  const { authState } = useContext(AuthContext);
  const token = authState.token;

  const handleConfirm = () => {
    //todo 发起请求
    setProductList([...productList, addData.current]);
    addData.current = {};
    MyToast("success", "创建成功");
  };

  const keys = ["名称", "类型", "描述"];
  const keysInEng = ["name", "type", "description"];
  const requiredIdx = [0];
  let dataListMap = keys.map((value, idx) => {
    // console.log(e);
    return (
      <Input
        label={value + ":"}
        required={requiredIdx.indexOf(idx) !== -1 ? true : false}
        onChange={(e) => {
          console.log(value);
          addData.current[keysInEng[idx]] = e.target.value;
        }}
        clearable={true}
        border={true}
      />
    );
  });

  return (
    <>
      <CreateOrg
        keys={keys}
        keysInEng={keysInEng}
        handleConfirm={handleConfirm}
        addData={addData.current}
        requiredIdx={requiredIdx}
        className={"Bu"}
        popupInfo="创建组织"
      >
        {dataListMap}
      </CreateOrg>
    </>
  );
}
