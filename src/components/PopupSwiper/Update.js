import { PopupSwiper, Cell, Button } from "@arco-design/mobile-react";
import { useState } from "react";
import { OrganizationContext } from "@/context/Organization";
import { AuthContext } from "@/context/AuthContext";
import { Input } from "@arco-design/mobile-react";
import MyToast from "@/components/Toast/toast";
import { ChangeUserInfo, DelUser } from "@/services/User";
export default function Info({
  updateContent,
  children,
  info,
  id,
  handleDelete = null,
  handleChange = null,
  record,
  setRecord,
  content1 = "修改信息",
  content2 = "删除用户",
  infosEles = null,
  setCurrentVariable = null,
  index = null,
}) {
  const [visible, setVisible] = useState(false);
  const [update, setUpdate] = useState(false);
  //* info是原来的信息，record更新会导致User组件更新，但传的info还是第一次渲染的info
  //* 按键样式
  const DelColorConfig = {
    normal: "#ff0000",
    active: "#fbe1d9",
    disabled: "#FFF",
  };

  //* 点击成员框获得详细信息
  const handleClickTr = (e) => {
    setVisible(!visible);
    //****** 深引用 */
    setRecord({ ...info });
    if (setCurrentVariable !== null) {
      // console.log(index);
      setCurrentVariable(index);
    }
  };
  //* 用户的详细信息
  let eles = Object.keys(info).map((e, idx) => {
    return <Cell>{e + " : " + info[e]}</Cell>;
  });

  //* 取消修改
  const handleCancelChange = () => {
    setUpdate(!update);
    // setRecord(info)
  };
  //* PopUp的内容根据update来判断
  let son =
    update === false ? (
      <>
        {infosEles !== null ? infosEles : eles}
        <div className="PopupButtons">
          <Button
            onClick={() => {
              setUpdate(!update);
            }}
          >
            {content1}
          </Button>
          <Button
            onClick={() => {
              setVisible(!visible);
              handleDelete(id);
            }}
            bgColor={DelColorConfig}
          >
            {content2}
          </Button>
        </div>
      </>
    ) : (
      <>
        {updateContent}
        <div className="PopupButtons">
          <Button onClick={handleCancelChange}>取消修改</Button>
          <Button
            onClick={() => {
              //* 发起网络请求
              handleChange(record);
              setUpdate(!update);
            }}
          >
            确认修改
          </Button>
        </div>
      </>
    );

  return (
    <>
      <tr id={id} onClick={handleClickTr}>
        {children}
      </tr>
      <PopupSwiper
        visible={visible}
        close={() => {
          //会出现闪的原因是当处于修改状态时，update变为false会触发重新渲染，而visible还是true
          setUpdate(false);
          setVisible(false);
        }}
        allowSwipeDirections={["right", "bottom"]}
        exitDirection={"bottom"}
      >
        {son}
      </PopupSwiper>
    </>
  );
}
