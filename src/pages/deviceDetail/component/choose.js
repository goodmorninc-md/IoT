import { useState, useContext, useRef, useEffect } from "react";

import { Button, Cell, Input } from "@arco-design/mobile-react";

import { PopupSwiper } from "@arco-design/mobile-react";
import { ListAllMapofProd } from "@/services/mapping";
import { UpdateDevice } from "@/services/device";
import MyToast from "@/components/Toast/toast";
import { ListCustormersOfProd } from "@/services/Custormer";
import CellNodata from "@/components/InfoList/lackData";
export default function SelectPopup({
  productId,
  deviceId,
  deviceInfo,
  setDeviceInfo,
  visible,
  setVisible,
  update,
  setUpdate,
  type = 1,
}) {
  const [selectList, SetSelectList] = useState([]);
  const [selectEle, setSelectEle] = useState({});
  useEffect(() => {
    if (visible) {
      if (type === 1)
        ListAllMapofProd(productId).then((data) => {
          SetSelectList(data);
        }).catch(error=>{
          MyToast("error","获取变量列表失败")
        });
      else if (type === 2) {
        ListCustormersOfProd(productId).then((data) => {
          console.log(data);
          SetSelectList(data);
        }).catch(error=>{
          MyToast("error","获取客户列表失败")
        });
      }
    }
  }, [visible]);
  console.log(selectList,selectEle.id);

  let son1;
  if (type === 1 && "mapping" in deviceInfo) {
    son1 = <Cell label={deviceInfo.mapping.name}>已绑定</Cell>;
  } else if (type === 2 && "customer" in deviceInfo)
    son1 = <Cell label={deviceInfo.customer.name}>已绑定</Cell>;
  else
    son1 = selectList.map((data, idx) => {
      return (
        <Cell
          id={data.id}
          style={{
            backgroundColor: selectEle.id === data.id ? "#e6f7ff" : "#fff",
          }}
          onClick={() => setSelectEle(data)}
        >
          {data.name}
        </Cell>
      );
    });
  function handleSelect() {
    let body = {};
    if (type === 1) {
      body = { ...deviceInfo, mapping: selectEle };
    } else if (type === 2) {
      body = { ...deviceInfo, customer: selectEle };
    }
    UpdateDevice(productId, "", deviceId, body).then((data) => {
      MyToast("success", "绑定成功");
      setUpdate(update + 1);
      setVisible(!visible);
      setDeviceInfo(body);
    }).catch(error=>{
      MyToast("error","更新设备失败")
    });
  }
  return (
    <>
      <PopupSwiper
        visible={visible}
        close={() => {
          setVisible(false);
          setSelectEle([]);
        }}
        allowSwipeDirections={["right", "bottom"]}
        exitDirection={"bottom"}
      >
        {son1}
        <Button
          disabled={Object.keys(selectEle).length === 0}
          onClick={() => {
            handleSelect();
          }}
        >
          设置
        </Button>
      </PopupSwiper>
    </>
  );
}
