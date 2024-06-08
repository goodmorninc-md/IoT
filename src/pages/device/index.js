import MyTopBar from "@/components/TopBar/TopBar";
import { useState, useContext, useRef, useEffect } from "react";
import { Fragment } from "react";
import { OrganizationContext } from "@/context/Organization";
import { AuthContext } from "@/context/AuthContext";
import { Button, Cell, Input } from "@arco-design/mobile-react";
import { GetProductListByOrg } from "@/services/Product";
import { PopupSwiper } from "@arco-design/mobile-react";
import { GetDiviceList, DelDevice, CreateDevice } from "@/services/device";
import MyToast from "@/components/Toast/toast";
import MyDropDown from "@/components/Dropdown/dropdown";
import { ProductContext } from "@/context/Product";
import { useNavigate } from "react-router-dom";
import InfoDrawer from "@/components/InfoDrawer/InfoDrawer";
import { bgColor, delButtonbgColor } from "@/styles/buttonColorConfig";
import CellNodata from "@/components/InfoList/lackData";
import InfoList from "@/components/InfoList/infoList";
import { ReactComponent as IconDevice } from "@/assets/icon/device.svg";
export default function Device({ activeIndex }) {
  const { currentProduct, setCurrentProduct } = useContext(ProductContext);
  const { current_Organization } = useContext(OrganizationContext);
  const [deviceList, setDeviceList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [visible, setVisible] = useState(false);

  //* 当当前组织不为首页时，才可以根据组织获取产品列表
  //* currentOrganization发生变化时，会对产品列表进行重新请求
  useEffect(() => {
    if (productList.length === 0 && current_Organization.id !== "firstPage") {
      GetProductListByOrg(current_Organization.id)
        .then((data) => {
          setProductList(data);
        })
        .catch((error) => {
          MyToast("error", "获取产品列表失败");
        });
    }
  }, [current_Organization]);
  //* 当组织和产品都选取后，将会对设备进行请求
  useEffect(() => {
    if (
      Object.keys(currentProduct).length !== 0 &&
      current_Organization.id !== "firstPage"
    )
      GetDiviceList(currentProduct.id)
        .then((data) => {
          setDeviceList(data);
        })
        .catch((error) => {
          MyToast("error", "获取设备列表失败");
        });
  }, [currentProduct, current_Organization]);

  return (
    <div className="Not-cover">
      <MyTopBar
        LeftChildren={<InfoDrawer activeIndex={activeIndex}></InfoDrawer>}
      >
        {current_Organization.id !== "firstPage" && "id" in currentProduct ? (
          <Button
            onClick={() => setVisible(!visible)}
            icon={<IconDevice className="iconInfo"></IconDevice>}
            bgColor={bgColor}
            className="Bu"
          ></Button>
        ) : (
          <></>
        )}
      </MyTopBar>

      {/* <table className="table">
        <thead className="TrTable">
          <tr>
            <th>名称</th>
            <th>描述</th>
          </tr>
        </thead>
        <tbody> */}
      <DeviceList
        deviceList={deviceList}
        productId={currentProduct.id}
        organizationId={current_Organization.id}
        setDeviceList={setDeviceList}
      />
      {/* </tbody> */}
      {/* </table> */}
      {/* <MyTabBar activeIndex={2}></MyTabBar> */}
      <CreatePopup
        currentProduct={currentProduct}
        deviceList={deviceList}
        setDeviceList={setDeviceList}
        visible={visible}
        setVisible={setVisible}
      ></CreatePopup>
    </div>
  );
}

function DeviceList({ deviceList, setDeviceList, productId, organizationId }) {
  const navigate = useNavigate();
  function handleDelete(data) {
    DelDevice(productId, "", data.id)
      .then((res) => {
        let temp = deviceList.filter((e) => {
          return e.id !== data.id;
        });
        setDeviceList([...temp]);
        MyToast("success", "删除成功");
      })
      .catch((error) => {
        MyToast("error", "删除设备失败");
      });
  }
  let eles = (
    <InfoList
      InfoArray={deviceList}
      handleLook={(data) =>
        navigate(
          `/device/${data.id}?productId=${productId}&organizationId=${organizationId}`
        )
      }
      handleDel={(data) => handleDelete(data)}
    ></InfoList>
  );
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
    CreateDevice(currentProduct.id, "", newDevice)
      .then((data) => {
        MyToast("success", "创建成功");
        console.log(data);
        setDeviceList([...deviceList, data]);
        setNewDevice({});
      })
      .catch((error) => {
        MyToast("error", "创建设备失败");
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
        <Cell className="popup-title">新建设备</Cell>
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
