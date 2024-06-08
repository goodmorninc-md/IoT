import { useState } from "react";
import { UpdateCustormer } from "@/services/Custormer";
import { PopupSwiper, Cell, Input, Button } from "@arco-design/mobile-react";
import MyToast from "@/components/Toast/toast";
import Occupancy from "@/components/function/occupancy";
export default function EditInfo({
  custInfo,
  setCustInfo,
  visible,
  setVisible,
}) {
  const [record, setRecord] = useState({ ...custInfo });

  function handleEdit() {
    if ("name" in record && record.name.length > 0)
      UpdateCustormer(custInfo.id, record).then((res) => {
        setCustInfo({
          ...custInfo,
          name: record.name,
          description: record.description,
        });
        MyToast("success", "修改成功");
        setVisible(!visible);
      }).catch(error=>{
        MyToast("error","更新失败")
      });
    else {
      MyToast("warn", "名称不可为空");
    }
  }
  return (
    <PopupSwiper
      visible={visible}
      direction="bottom"
      exitDirection={["right", "bottom"]}
      close={() => setVisible(!visible)}
    >
      <Cell className="popup-title">修改信息</Cell>
      <Input
        label="名称"
        required
        onChange={(e) => setRecord({ ...record, name: e.target.value })}
        defaultValue={custInfo.name}
      ></Input>
      <Input
        disabled
        label={
          <>
            <Occupancy></Occupancy>地址
          </>
        }
        onChange={(e) => setRecord({ ...record, address: e.target.value })}
        defaultValue={custInfo.address}
      ></Input>
      <Input
        disabled
        label={
          <>
            <Occupancy></Occupancy>联系人
          </>
        }
        onChange={(e) => setRecord({ ...record, contact: e.target.value })}
        defaultValue={custInfo.contact}
      ></Input>
      <Input
        disabled
        label={
          <>
            <Occupancy></Occupancy>电话
          </>
        }
        onChange={(e) => setRecord({ ...record, phone: e.target.value })}
        defaultValue={custInfo.phone}
      ></Input>
      <Input
        label={
          <>
            <Occupancy></Occupancy>描述
          </>
        }
        onChange={(e) => setRecord({ ...record, description: e.target.value })}
        defaultValue={custInfo.description}
      ></Input>
      <Button onClick={handleEdit}>确认添加</Button>
    </PopupSwiper>
  );
}
