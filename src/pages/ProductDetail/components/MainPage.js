import TopBar from "@/components/TopBar/TopBar";
import { ProductContext } from "@/context/Product";
import "@/styles/home.less";
import { Button, Loading } from "@arco-design/mobile-react";
import Tabs from "./Tabs";
import MyToast from "@/components/Toast/toast";
import { useContext, useEffect } from "react";
import { GetOneProduct } from "@/services/Product";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ReactComponent as IconGetback } from "@/assets/icon/getBack.svg";
import { bgColor } from "@/styles/buttonColorConfig";
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
  const {productId} = useParams() 

  useEffect(() => {
    GetOneProduct(productId).then((data) => {
      setCurrentProduct(data);
    }).catch(error=>{
      MyToast("error","获取产品失败")
    });
  }, []);
  if(Object.keys(currentProduct).length === 0) return <Loading type="circle" radius={15} stroke={1} />
  return (
    <div className="Not-cover">
      {/* 添加组织栏 */}

      <TopBar
        LeftChildren={
          <Button
            className="sideBar"
            icon={<IconGetback className="iconInfoFpage"></IconGetback>}
            onClick={() => navigate("/product")}
            bgColor={bgColor}
          ></Button>
        }
        content={currentProduct.name}
      >
        {/* <CreateProductButton></CreateProductButton> */}
      </TopBar>
      <Tabs
        tabLabel={tabLabel}
        defaultActiveTab={index}
        productId={productId}
      ></Tabs>
    </div>
  );
}
