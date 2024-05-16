import MyTabBar from "@/components/TabBar/TabBar";
import TopBar from "@/components/TopBar/TopBar";
import { ProductContext } from "@/context/Product";
import "@/styles/home.less";
import "@/styles/product.less";
import { Button } from "@arco-design/mobile-react";
import Tabs from "./Tabs";
import { useContext, useEffect } from "react";
import { GetOneProduct } from "@/services/Product";
import { useLocation, useNavigate } from "react-router-dom";
import {ReactComponent as IconGetback} from "@/assets/icon/getBack.svg"
export default function MainPage() {
  const tabLabel = [
    { title: "产品信息" },
    { title: "物模型" },
    { title: "数据解析" },
    { title: "监测点" },
    { title: "示意图" },
    { title: "设备固件" },
    { title: "使用客户" },
  ];
  let t = [
    "detail",
    "specification",
    "mapping",
    "point",
    "diagram",
    "firmware",
    "custormer",
  ];
  const { currentProduct, productList, setCurrentProduct } =
    useContext(ProductContext);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const myParam = query.get("tab");
  const index = t.indexOf(myParam) >= 0 ? t.indexOf(myParam) : 0;
  console.log(index);
  const url = window.location.href;
  const productId = url.split("/").reverse()[0].split("?")[0];
  console.log(productId);
  useEffect(() => {
    GetOneProduct(productId).then((data) => {
      setCurrentProduct(data);
    });
  }, []);
  return (
    <>
      {/* 添加组织栏 */}

      <TopBar
        LeftChildren={
          <Button 
          className="sideBar"
          icon={<IconGetback className="iconInfoFpage"></IconGetback>}
          onClick={() => navigate("/product")}></Button>
        }
      >
        {/* <CreateProductButton></CreateProductButton> */}
      </TopBar>
      <div>{currentProduct.name}</div>
      <Tabs
        tabLabel={tabLabel}
        defaultActiveTab={index}
        productId={productId}
      ></Tabs>

      <MyTabBar activeIndex={1}></MyTabBar>
    </>
  );
}
