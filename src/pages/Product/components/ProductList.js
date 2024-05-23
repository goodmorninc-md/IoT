import Info from "@/components/PopupSwiper/Update";
import { useState, useContext, useRef, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { OrganizationContext } from "@/context/Organization";
import { AuthContext } from "@/context/AuthContext";
import { ProductContext } from "@/context/Product";
import { Button } from "@arco-design/mobile-react";
import { GetProductListByOrg } from "@/services/Product";

import {
  delButtonbgColor,
  bgColor,
  colorConfig,
} from "@/styles/buttonColorConfig";
import Dialog from "@/components/Popover/delConfirm";
export default function ProductList({}) {
  const { currentProduct, setCurrentProduct, productList, setProductList } =
    useContext(ProductContext);

  const Navigate = useNavigate();

  const handleChangeProduct = (data) => {
    const newProductList = productList.map((e) => {
      if (e.id === data.id) return data;
      else return e;
    });
    setProductList(newProductList);
  };

  const handleNavigate = (productId) => {
    Navigate(`/product/${productId}`);
  };
  const handleDel = (productId) => {
    
  };
  //* 产品列表
  const ProductListMap = productList.map((data, idx) => {
    console.log(data);
    return (
      <tr>
        <td>
          {data.name}
          <Button className="tr-button" onClick={()=> handleNavigate(data.id)}>
            查看
          </Button>
        </td>
        <td>
          {data.description}
          <Dialog content="删除" handleDel={()=> console.log("del")}></Dialog>
        </td>
      </tr>
    );
  });

  return (
    <>
      <table className="table">
        <thead className="TrTable border-bottom">
          <tr>
            <th>名称</th>
            <th>描述</th>
          </tr>
        </thead>
        <tbody>{ProductListMap}</tbody>
      </table>
    </>
  );
}
