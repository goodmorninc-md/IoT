import MyTabBar from "@/components/TabBar/TabBar";
import MyTopBar from "@/components/TopBar/TopBar";
import MyPopover from "@/components/Popover/Popover";
import { useState, useContext, useRef, useEffect } from "react";
import { Fragment } from "react";
import { OrganizationContext } from "@/context/Organization";
import { AuthContext } from "@/context/AuthContext";
import { Button, Cell, Input } from "@arco-design/mobile-react";
import { CreateOrganization } from "@/services/Organization";
import { GetProductListByOrg } from "@/services/Product";
import { PopupSwiper } from "@arco-design/mobile-react";
import {
  GetDiviceList,
  FindDevice,
  UpdateDevice,
  DelDivce,
  CreateDevice,
} from "@/services/device";
import MyToast from "@/components/Toast/toast";
import MyDropDown from "@/components/Dropdown/dropdown";
import { ProductContext } from "@/context/Product";
import { useNavigate } from "react-router-dom";
import InfoDrawer from "@/components/InfoDrawer/InfoDrawer";

export default function Device() {
  const { currentProduct, setCurrentProduct } = useContext(ProductContext);
  const { current_Organization } = useContext(OrganizationContext);
  const [deviceList, setDeviceList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [visible, setVisible] = useState(false);
  //* 当当前组织不为首页时，才可以根据组织获取产品列表
  //* currentOrganization发生变化时，会对产品列表进行重新请求
  useEffect(() => {
    if (productList.length === 0 && current_Organization.id !== "firstPage") {
      GetProductListByOrg(current_Organization.id).then((data) => {
        setProductList(data);
      });
    }
  }, [current_Organization]);
  //* 当组织和产品都选取后，将会对设备进行请求
  useEffect(() => {
    if (
      Object.keys(currentProduct).length !== 0 &&
      current_Organization.id !== "firstPage"
    )
      GetDiviceList(currentProduct.id).then((data) => {
        setDeviceList(data);
        console.log(data)
      });
  }, [currentProduct, current_Organization]);

  function handleDropDownOnClick(data) {
    //* 打印的是id
    console.log(data);
    setCurrentProduct({ ...currentProduct, id: data });
  }

  return (
    <>
      <MyTopBar LeftChildren={<InfoDrawer></InfoDrawer>}>
        
      </MyTopBar>
      {current_Organization.id !== "firstPage" && "id" in currentProduct ? (
        <Button onClick={() => setVisible(!visible)}>新建设备</Button>
      ) : (
        <></>
      )}

      <table className="table">
        <thead className="TrTable">
          <tr>
            <th>名称</th>
            <th>描述</th>
          </tr>
        </thead>
        <tbody>
          <DeviceList
            deviceList={deviceList}
            productId={currentProduct.id}
            organizationId={current_Organization.id}
          />
        </tbody>
      </table>
      <MyTabBar activeIndex={2}></MyTabBar>
      <CreatePopup
        currentProduct={currentProduct}
        deviceList={deviceList}
        setDeviceList={setDeviceList}
        visible={visible}
        setVisible={setVisible}
      ></CreatePopup>
    </>
  );
}

function DeviceList({ deviceList, productId, organizationId }) {
  const navigate = useNavigate();
  let eles = deviceList.map((data, idx) => {
    return (
      <Fragment key={idx}>
        <tr>
          <td>
            {data.name}
            <Button
              onClick={() =>
                navigate(
                  `/device/${data.id}?productId=${productId}&organizationId=${organizationId}`
                )
              }
            >
              查看
            </Button>
          </td>
          <td>
            {data.description}
            <Button>删除</Button>
          </td>
        </tr>
      </Fragment>
    );
  });
  return <>{eles}</>;
}

function CreatePopup({
  currentProduct,
  deviceList,
  setDeviceList,
  visible,
  setVisible,
}) {
  const [newDevice, setNewDevice] = useState({});

  const requiredIdx = [0, 2, 3];
  const keysInEng = ["deviceKey", "name", "period", "frequency", "description"];
  const keys = [
    "deviceKey",
    "名称",
    "数据发送周期(秒)",
    "采样频率(Hz)",
    "描述",
  ];
  const placeholders = [
    "唯一标识Device的编号，产品维度内唯一",
    "设备名称",
    "设备箱服务器发送数据的周期，单位:秒",
    "设备采样频率,单位:Hz",
    "",
  ];
  const checkRequire = () => {
    let flag = true;
    requiredIdx.map((e) => {
      if (keysInEng[e] in newDevice && newDevice[keysInEng[e]].length > 0) {
        return;
      } else {
        flag = false;
      }
    });
    return flag;
  };

  function handleCreateDevice() {
    console.log(newDevice);
    CreateDevice(currentProduct.id, "", newDevice).then((data) => {
      MyToast("success", "创建成功");
      console.log(data)
      setDeviceList([...deviceList, data]);
      setNewDevice({});
    });
  }
  let son1 = keys.map((data, idx) => {
    return (
      <Input
        required={requiredIdx.indexOf(idx) !== -1}
        label={keys[idx]}
        placeholder={placeholders[idx]}
        onChange={(e) => {
          let temp = { ...newDevice };
          temp[keysInEng[idx]] = e.target.value;
          setNewDevice(temp);
        }}
      ></Input>
    );
  });

  return (
    <>
      <PopupSwiper
        visible={visible}
        close={() => {
          setVisible(false);
        }}
        allowSwipeDirections={["right", "bottom"]}
        exitDirection={"bottom"}
      >
        {son1}
        <Button
          onClick={() => {
            if (checkRequire()) {
              setVisible(!visible);
              handleCreateDevice();
            } else {
              MyToast("warn", "请添加名称");
            }
          }}
        >
          确认添加
        </Button>
      </PopupSwiper>
    </>
  );
}
