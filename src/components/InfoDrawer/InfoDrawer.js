import {
  Button,
  PopupSwiper,
  Image,
  ImagePreview,
} from "@arco-design/mobile-react";
import { useState, useContext, useEffect, useRef } from "react";
import { OrganizationContext } from "@/context/Organization";
import { ProductContext } from "@/context/Product";
import { GetOneProduct, GetProductListByOrg } from "@/services/Product";
import Select from "@/components/select/select";
import { ReactComponent as MenuIcon } from "@/assets/icon/menu.svg";
import { ReactComponent as LogoutIcon } from "@/assets/icon/logout.svg";
import { AuthContext } from "@/context/AuthContext";
import { GetOrganizationList } from "@/services/Organization";
import MyToast from "../Toast/toast";
export default function InfoDrawer({ children, activeIndex }) {
  const [visible, setVisible] = useState(false);
  const {
    current_Organization,
    setCurrentOrganization,
    OrganizationList,
    setOrganizationList,
    currenOrgId,
    setCurrentOrgId,
  } = useContext(OrganizationContext);
  const [first, setFirst] = useState(0);
  const { currentProduct, setCurrentProduct, productList, setProductList } =
    useContext(ProductContext);

  useEffect(()=>{
    if(visible){
      GetOrganizationList().then(data=>{
        // console.log(data)
        setOrganizationList(data)
      }).catch(error=>{
        console.log(error)
        MyToast("error","请求组织列表错误")
      })
    }

  },[visible])
  //* 获取该组织下的的产品列表
  useEffect(() => {
    if (activeIndex !== -1 && activeIndex !== 0 && first !== 0) {
      setCurrentProduct({});
    }
    if (current_Organization.id !== "firstPage") {
      GetProductListByOrg(current_Organization.id).then((data) => {
        // console.log(data);
        setProductList(data);
      }).catch(error=>{
        MyToast("error","获取产品列表失败")
      });
    }
    setFirst(first + 1);
  }, [current_Organization.id, setCurrentProduct, setProductList]);
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
  prod_data_select = [prod_data_select]
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
    // console.log(e);
    setCurrentOrgId(e.id);
  }
  function handleChangeProd(e) {
    GetOneProduct(e.id).then((data) => {
      setCurrentProduct(data);
      // console.log(data);
    }).catch(error=>{
      MyToast("error","获取产品详情失败")
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
        // exitDirection="right"
        close={() => {
          setVisible(!visible);
        }}
        allowSwipeDirections={["right", "bottom"]}
        style={{ backgroundColor: "black" }}
      >
        <div className="more-space">
          <Select
            label="组织"
            disabled={org_data_select[0].length === 0}
            singleList={org_data_select}
            text={text_org}
            handleChange={handleChangeOrg}
          ></Select>
          {activeIndex !== 0 && activeIndex !== -1 && activeIndex !== 1 && (
            <Select
              label="产品"
              singleList={prod_data_select}
              text={text_prod}
              // disabled={prod_data_select[0].length}
              handleChange={handleChangeProd}
            ></Select>
          )}
        </div>
        <>
          <LogOut></LogOut>
        </>
      </PopupSwiper>
    </>
  );
}

/* */

function LogOut({}) {
  const { authState, logout } = useContext(AuthContext);
  const user = authState.user;
  function handleLogout() {
    logout();
  }
  return (
    <div className="popup-bottom">
      <Image
        width="2.18rem"
        height="2.18rem"
        staticLabel
        retryTime={3}
        src={user.avatar}
        onAutoRetry={(e) => console.log("retry", e)}
        errorArea={
          <div className="image-retry-load">
            <LoadFailFace />
            <div style={{ marginTop: 8 }}>Load failed</div>
          </div>
        }
        radius="1rem"
      ></Image>
      {/* <ImagePreview
        openIndex={0}
        images={[
          {
            src: user.avatar,
            fallbackSrc: user.avatar,
          },
        ]}
        onImageDoubleClick={(index) => console.log("dbl click", index)}
        onImageLongTap={(index, image) => {
          alert("long tap");
          console.log("long tap", index, image);
        }}
        close={() => {
          console.log("close");
        }}
        thumbPosition="center top"
      ></ImagePreview> */}
      <Button onClick={handleLogout} style={{ width: "30%" }}>
        登出
      </Button>
    </div>
  );
}

function LoadFailFace() {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
      <path
        d="M12.5 24C6.15458 24 1 18.8454 1 12.5C1 6.15458 6.15458 1 12.5 1C18.8454 1 24 6.15458 24 12.5C24 18.8454 18.8454 24 12.5 24Z"
        stroke="white"
      />
      <path
        d="M12.5298 14.6972C9.45045 14.736 8.2352 17.2113 8.1837 17.3181C8.07042 17.5511 8.1837 17.8229 8.43087 17.9199C8.67804 18.0267 8.96641 17.9199 9.06939 17.687C9.07969 17.6676 10.0684 15.5805 12.5401 15.6H12.5813C14.9088 15.6 15.9078 17.5996 15.949 17.687C16.0622 17.9102 16.3403 18.017 16.5875 17.9102C16.8346 17.8035 16.9376 17.5414 16.8243 17.3084C16.7729 17.2016 15.537 14.6875 12.571 14.6875C12.571 14.6972 12.5504 14.6972 12.5298 14.6972Z"
        fill="white"
        stroke="white"
        strokeWidth="0.2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.8698 8.13965C17.4725 8.13965 17.9611 8.62825 17.9611 9.23097V10.868C17.9611 11.4707 17.4725 11.9593 16.8698 11.9593C16.267 11.9593 15.7784 11.4707 15.7784 10.868V9.23097C15.7784 8.62825 16.267 8.13965 16.8698 8.13965ZM8.13918 8.13965C8.7419 8.13965 9.2305 8.62825 9.2305 9.23097V10.868C9.2305 11.4707 8.7419 11.9593 8.13918 11.9593C7.53645 11.9593 7.04785 11.4707 7.04785 10.868V9.23097C7.04785 8.62825 7.53645 8.13965 8.13918 8.13965Z"
        fill="white"
      />
    </svg>
  );
}
