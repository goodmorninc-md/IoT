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
import {
  Cell,
  Divider,
  Button,
  Input,
  Picker,
  Radio,
  Textarea,
} from "@arco-design/mobile-react";
import "@/styles/home.less";
import "@/styles/product.less";

import MyRadio from "./Radio";
const keys = ["名称", "类型", "描述"];
const keysInEng = ["name", "type", "description"];

export default function ProductList({}) {
  const { currentProduct, setCurrentProduct, productList, setProductList } =
    useContext(ProductContext);
  const Navigate = useNavigate();
  //* 需要一个record来记录之前的内容
  const [record, setRecord] = useState({});
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

  //* 更新信息
  const UpdateChildren = (
    <>
      <Input
        label={keys[0] + ":"}
        required
        onChange={(e) => {
          setRecord({ ...record, name: e.target.value });
        }}
        defaultValue={record.name}
      ></Input>
      <div>
        <div>类型:</div>
        <MyRadio record={record} setRecord={setRecord}></MyRadio>
      </div>
      <Textarea
        prefix="Message"
        statisticsMaxlength={50}
        autosize
        placeholder="Please enter the description"
        border="all"
        rows={2}
        renderStatistics={(cur, max) => `${cur}/${max}`}
        label={"描述"}
        defaultValue={record.description}
        onChange={(e) => {
          setRecord({ ...record, description: e.target.value });
        }}
      />
    </>
  );
  //* 产品列表
  const ProductListMap = productList.map((data, idx) => {
    console.log(data);
    return (
      <Info
        updateContent={UpdateChildren}
        keys={keys}
        keysInEng={keysInEng}
        requiredIdx={[0]}
        info={data}
        handleChange={handleChangeProduct}
        handleDelete={() => {
          handleNavigate(data.id);
          setCurrentProduct(data);
        }}
        record={record}
        setRecord={setRecord}
        content2={"产品详情"}
      >
        <td>{data.name}</td>
        <td>{data.description}</td>
      </Info>
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
