import { OrganizationContextProvider } from "@/context/Organization";
import { AuthProvider } from "@/context/AuthContext";
import { ProductContext } from "@/context/Product";
import {
  Cell,
  Button,
  PopupSwiper,
  Input,
  Textarea,
} from "@arco-design/mobile-react";
import { IconEdit } from "@arco-design/mobile-react/esm/icon";
import Occupancy from "@/components/function/occupancy";
import MyTopBar from "@/components/TopBar/TopBar";
import ReturnButton from "@/components/TopBar/return";
import InfoList from "@/components/InfoList/infoList";
import * as Point from "@/services/point";
import * as Product from "@/services/Product";
import * as Device from "@/services/device";
import { useContext, useEffect, useState, Fragment } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MyToast from "@/components/Toast/toast";
import { GetDiviceList } from "@/services/device";
import GetTime from "@/components/function/time";
import { bgColor } from "@/styles/buttonColorConfig";
import TitleWithButton from "@/components/TopBar/titleWithButton";
export default function PointDetail() {
  const { currentProduct } = useContext(ProductContext);
  const [point, setPoint] = useState({});
  const navigate = useNavigate();
  const url = window.location.href;
  const a = url.split("/").reverse();
  const pointId = a[0];
  const productId = a[2];
  //* 跳转至产品页
  if (pointId === undefined || productId === undefined) navigate("/product");
  useEffect(() => {
    Point.ShowDetailsOfPoint(productId, pointId)
      .then((data) => {
        setPoint(data);
      })
      .catch((error) => {
        MyToast("error", "获取监测点详情失败");
      });
  }, []);
  return (
    <>
      <MyTopBar
        LeftChildren={
          <ReturnButton
            navigate={() => navigate(`/product/${productId}?tab=point`)}
          ></ReturnButton>
        }
        content={currentProduct.name}
      ></MyTopBar>
      <PointInfo point={point} setPoint={setPoint}></PointInfo>
      <BindDevice></BindDevice>
    </>
  );
}
function PointInfo({ point, setPoint }) {
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState({ ...point });
  const url = window.location.href;
  const a = url.split("/").reverse();
  const pointId = a[0];
  const productId = a[2];
  function handleEditConfirm() {
    if (record.name.length !== 0)
      Point.UpdatePoint(productId, pointId, record)
        .then((res) => {
          setPoint({ ...res });
          MyToast("success", "修改成功");
          setVisible(!visible);
        })
        .catch((error) => {
          MyToast("error", "更新监测点失败");
        });
    else MyToast("warn", "名称不可为空");
  }
  //   function handleClick
  return (
    <>
      <TitleWithButton
        handleClick={() => setVisible(!visible)}
        title={"监测点信息"}
      ></TitleWithButton>

      <Cell label={"名称"} text={point.name}></Cell>
      <Cell label={"描述"} text={point.description}></Cell>
      <PopupSwiper
        visible={visible}
        close={() => {
          setVisible(false);
        }}
        allowSwipeDirections={["right", "bottom"]}
        exitDirection={"bottom"}
      >
        <Input
          required
          label="名称"
          placeholder="请输入监测点名称"
          onChange={(e) => {
            setRecord({ ...record, name: e.target.value });
          }}
          defaultValue={point.name}
        ></Input>
        <Textarea
          label={
            <span>
              <Occupancy></Occupancy>描述
            </span>
          }
          statisticsMaxlength={100}
          autosize
          autoFocus
          onChange={(e) =>
            setRecord({ ...record, description: e.target.value })
          }
          defaultValue={point.description}
        ></Textarea>
        <Button onClick={handleEditConfirm}>确认修改</Button>
      </PopupSwiper>
    </>
  );
}
function BindDevice() {
  const [visible, setVisible] = useState(false);
  const url = window.location.href;
  const a = url.split("/").reverse();
  const pointId = a[0];
  const productId = a[2];
  //* deviceList是该监测点绑定的设备列表
  const [deviceList, setDeviceList] = useState([]);
  const [bindDeviceList, setBindDeviceList] = useState([]);
  function handleBind() {}
  //* 在绑定后会设置，那么在这里就会重新请求设备列表，查找已绑定的设备列表
  useEffect(() => {
    GetDiviceList(productId)
      .then((data) => {
        let bindDeviceListFilter = data.filter((e) => {
          return e.point === pointId;
        });
        setDeviceList(data);
        setBindDeviceList(bindDeviceListFilter);
      })
      .catch((error) => {
        MyToast("error", "获取设备列表失败");
      });
  }, []);

  return (
    <>
      {/* <Cell label=>
        <Button onClick={() => setVisible(!visible)}></Button>
      </Cell> */}
      <div className="div-text-button">
        <span className="occupancy"></span>
        <span className="text-center">已绑定设备</span>
        <button
          onClick={() => setVisible(!visible)}
          className="cell-button normal-button"
        >
          绑定设备
        </button>
      </div>
      <BindDeviceList
        bindDeviceList={bindDeviceList}
        setDeviceList={setBindDeviceList}
      ></BindDeviceList>
      <BindDevicePopup
        deviceList={deviceList}
        setBindDeviceList={setBindDeviceList}
        visible={visible}
        setVisible={setVisible}
        pointId={pointId}
      ></BindDevicePopup>
    </>
  );
}

function BindDeviceList({ bindDeviceList, setDeviceList }) {
  const { productId, pointId } = useParams();
  function handleUnbind(data) {
    console.log(1);
    Product.unbind(productId, data.id)
      .then((res) => {
        let newDeviceList = bindDeviceList.filter((ele) => {
          return ele.id !== data.id;
        });
        setDeviceList([...newDeviceList]);
        MyToast("success", "解绑成功");
      })
      .catch((error) => {
        MyToast("error", "解绑失败");
      });
  }

  function handleLook(data) {
    setDevice({ ...data });
    setVisible(!visible);
  }
  //* 控制绑定设备的信息弹窗
  const [visible, setVisible] = useState(false);
  const [device, setDevice] = useState({});
  // console.log(bindDeviceList);
  return (
    <>
      <InfoList
        InfoArray={bindDeviceList}
        handleDel={handleUnbind}
        handleLook={handleLook}
        delContent={"解绑"}
      ></InfoList>

      <BindDeiveInfo
        device={device}
        visible={visible}
        setVisible={setVisible}
      ></BindDeiveInfo>
    </>
  );
}
function BindDeiveInfo({ device, visible, setVisible }) {
  const status = ["", "在线", "离线", "", "已禁用"];

  return (
    <PopupSwiper
      visible={visible}
      close={() => {
        setVisible(false);
      }}
      allowSwipeDirections={["right", "bottom"]}
      // exitDirection={"right"}
      direction="bottom"
    >
      <Cell className="popup-title">设备信息</Cell>
      <Cell label={"名称"}>{device.name}</Cell>
      <Cell label={"设备编号"}>{device.deviceKey}</Cell>
      <Cell label={"描述"}>{device.description}</Cell>
      <Cell label={"状态"}>{status[device.status]}</Cell>
      <Cell label={"最后在线时间"}>{GetTime(device.lastOnlineAt)}</Cell>
    </PopupSwiper>
  );
}
//* 这个visible是绑定弹窗的visible
function BindDevicePopup({
  deviceList,
  setBindDeviceList,
  visible,
  setVisible,
  pointId,
}) {
  //   const [visible, setVisible] = useState(false);
  return (
    <PopupSwiper
      visible={visible}
      close={() => {
        setVisible(false);
      }}
      allowSwipeDirections={["right", "bottom"]}
      // exitDirection={"right"}
      direction="right"
    >
      <div style={{ width: "8rem" }}>
        <table className="table">
          <thead className="TrTable border-bottom">
            <tr>
              <th>名称</th>
              <th>设备编号</th>
              <th>描述</th>
            </tr>
          </thead>
          <tbody>
            <InfoDrawer
              deviceList={deviceList}
              setBindDeviceList={setBindDeviceList}
              visible={visible}
              setVisible={setVisible}
              pointId={pointId}
            ></InfoDrawer>
          </tbody>
        </table>
      </div>
    </PopupSwiper>
  );
}
function InfoDrawer({
  deviceList,
  setBindDeviceList,
  visible,
  setVisible,
  pointId,
}) {
  const url = window.location.href;
  const a = url.split("/").reverse();
  const productId = a[2];
  function handleClick(data) {
    if (data.point === pointId) return MyToast("warn", "已绑定该设备");
    Device.unbind(productId, data.id, data.deviceKey)
      .then((res) => {
        if (res.code === 409) MyToast("warn", "已绑定该设备");
        else {
          console.log(data);
          MyToast("success", "绑定成功");
          setVisible(!visible);
          
          setBindDeviceList((e) => {
            let temp = [...e]
            temp.push(data)  
            return [...temp];
          });
        }
      })
      .catch((error) => {
        MyToast("error", "解绑失败");
      });
  }
  let map = deviceList.map((data, idx) => {
    return (
      <Fragment key={idx}>
        <tr onClick={() => handleClick(data)}>
          <td>
            <span className="tr-text">{data.name}</span>
          </td>
          <td>
            <span className="tr-text">{data.deviceKey}</span>
          </td>
          <td>
            <span className="tr-text">{data.description}</span>
          </td>
        </tr>
      </Fragment>
    );
  });
  return map;
}
