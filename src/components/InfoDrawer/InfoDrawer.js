import { Button, PopupSwiper } from "@arco-design/mobile-react";
import { IconArrowIn } from "@arco-design/mobile-react/esm/icon";
import "@/styles/home.less";
import "@/styles/drawer.less";
import { useState, useContext, useEffect } from "react";
import { OrganizationContext } from "@/context/Organization";
import { ProductContext } from "@/context/Product";
import { GetProductListByOrg } from "@/services/Product";
import MyDropDown from "../Dropdown/dropdown";
export default function InfoDrawer({ children }) {
  const [visible, setVisible] = useState(false);
  const {
    current_Organization,
    setCurrentOrganization,
    OrganizationList,
    setOrganizationList,
  } = useContext(OrganizationContext);
  const { currentProduct, setCurrentProduct, productList, setProductList } =
    useContext(ProductContext);

  //* 获取该组织下的的产品列表
  useEffect(() => {
    GetProductListByOrg(current_Organization).then((data) => {
      console.log(data)
      setProductList(data);
    });
  }, [current_Organization]);
  function openDrawer() {
    setVisible(!visible);
  }
  return (
    <>
      <Button
        className="sideBar"
        onClick={openDrawer}
        icon={<IconArrowIn></IconArrowIn>}
      ></Button>
      <PopupSwiper
        visible={visible}
        direction="left"
        exitDirection="right"
        close={() => {
          setVisible(!visible);
        }}
        allowSwipeDirections={["right", "bottom"]}
      >
        <div className="container">
          <div>
            <MyDropDown
              DropDownElements={OrganizationList}
              // DropDownOnClick={DropDownOnClick}
              // className={"spacer"}
              initialValue={current_Organization}
            ></MyDropDown>
            <MyDropDown
              DropDownElements={productList}
              // DropDownOnClick={DropDownOnClick}
              // className={"spacer"}
              initialValue={currentProduct}
            ></MyDropDown>
          </div>
          <div></div>
        </div>
      </PopupSwiper>
    </>
  );
}
