import {
  Button,
  PopupSwiper,
  Collapse,
  Cell,
  DropdownMenu,
} from "@arco-design/mobile-react";
import { IconArrowIn } from "@arco-design/mobile-react/esm/icon";
import "@/styles/home.less";
import "@/styles/drawer.less";
import { useState, useContext, useEffect } from "react";
import { OrganizationContext } from "@/context/Organization";
import { ProductContext } from "@/context/Product";
import { GetProductListByOrg } from "@/services/Product";
import Select from "@/components/select/select";
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

  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  //* 获取该组织下的的产品列表
  useEffect(() => {
    setCurrentProduct({});
    GetProductListByOrg(current_Organization.id).then((data) => {
      console.log(data);
      setProductList(data);
    });
  }, [current_Organization]);
  function openDrawer() {
    setVisible(!visible);
  }
  const options = [
    { label: "选项1", value: 1 },
    { label: "选项2", value: 2 },
    { label: "选项3", value: 3 },
    { label: "选项4", value: 4 },
  ];

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
    setCurrentProduct(e);
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
