import {
  Button,
  PopupSwiper,
  Collapse,
  Cell,
  DropdownMenu,
} from "@arco-design/mobile-react";
import { IconArrowIn } from "@arco-design/mobile-react/esm/icon";
import { useState, useContext, useEffect, useMemo } from "react";
import { OrganizationContext } from "@/context/Organization";
import { ProductContext } from "@/context/Product";
import { GetOneProduct, GetProductListByOrg } from "@/services/Product";
import Select from "@/components/select/select";
import { ReactComponent as MenuIcon } from "@/assets/icon/menu.svg";
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
  console.log(current_Organization.id);
  //* 获取该组织下的的产品列表
  useEffect(() => {
    console.log("current_Organization changed", current_Organization.id);
    setCurrentProduct({});
    GetProductListByOrg(current_Organization.id).then((data) => {
      console.log(data);
      setProductList(data);
    });
  }, [current_Organization.id]);
  function openDrawer() {
    setVisible(!visible);
  }

  let org_data_select = OrganizationList.map((data, idx) => {
    return { label: data.name, value: data };
  });
  let prod_data_select = productList.map((data, idx) => {
    return { label: data.name, value: data };
  });
  org_data_select = [org_data_select];
  let text_org =
    OrganizationList.find((e) => e.id === current_Organization.id) !== undefined
      ? OrganizationList.find((e) => e.id === current_Organization.id).name
      : "请选择组织";

  let text_prod =
    productList.find((e) => e.id === currentProduct.id) !== undefined
      ? currentProduct.name
      : "请选择产品";
  function handleChangeOrg(e) {
    setCurrentOrganization(e);
  }
  function handleChangeProd(e) {
    GetOneProduct(e.id).then((data) => {
      setCurrentProduct(data);
      console.log(data)
    });
  }
  const colorConfig = {
    normal: "transparent",
    active: "#F53F3F",
    disabled: "#FBACA3",
  };
  return (
    <>
      <Button
        bgColor={colorConfig}
        className="sideBar"
        onClick={openDrawer}
        icon={<MenuIcon className="iconInfo"></MenuIcon>}
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
          <Select
            label="组织"
            singleList={org_data_select}
            text={text_org}
            handleChange={handleChangeOrg}
          ></Select>
          <Select
            label="产品"
            singleList={prod_data_select}
            text={text_prod}
            handleChange={handleChangeProd}
          ></Select>
        </div>
      </PopupSwiper>
    </>
  );
}

/* */
