import { useState, useContext, useRef, useEffect } from "react";

import { Button, Cell, Input } from "@arco-design/mobile-react";

import { PopupSwiper } from "@arco-design/mobile-react";
import { ListAllMapofProd } from "@/services/mapping";
import { UpdateDevice } from "@/services/device";
import MyToast from "@/components/Toast/toast";
import { ListCustormersOfProd } from "@/services/Custormer";
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
  const [selectEle, setSelectEle] = useState("");
  useEffect(() => {
    if (type === 1)
      ListAllMapofProd(productId).then((data) => {
        SetSelectList(data);
      });
    else if (type === 2) {
      ListCustormersOfProd(productId).then((data) => {
        SetSelectList(data);
      });
    }
  }, [visible]);
  let son1;
  if (type === 1) {
    if ("mapping" in deviceInfo && type === 1) son1 = <Cell>暂无数据</Cell>;
    else if ("custormer" in deviceInfo && type === 2)
      son1 = <Cell>暂无数据</Cell>;
    else
      son1 = selectList.map((data, idx) => {
        return (
          <Cell
            id={data.id}
            style={{
              backgroundColor: selectEle.id === data.id ? "#e6f7ff" : "#fff",
            }}
            onClick={() => setSelectEle(data.id)}
          >
            {data.name}
          </Cell>
        );
      });
  }
  console.log(son1);

  function handleSelect() {
    let body = {};
    if (type === 1) {
      body = { ...deviceInfo, mapping: selectEle.id };
    } else if (type === 2) {
      body = { ...deviceInfo, mapping: selectEle.id };
    }
    UpdateDevice(productId, "", deviceId, body).then((data) => {
      MyToast("success", "绑定成功");
      setUpdate(update + 1);
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
          disabled={selectEle.length === 0}
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
