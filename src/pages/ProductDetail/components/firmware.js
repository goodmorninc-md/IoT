import { ProductContext } from "@/context/Product";
import { CustormerContext } from "@/context/Custormer";
import { Fragment, useContext, useEffect, useState } from "react";
import {
  Button,
  Input,
  PopupSwiper,
  Textarea,
  Uploader,
} from "@arco-design/mobile-react";
import "@/styles/mapping.less";
import MyDropDown from "@/components/Dropdown/dropdown";
import MyToast from "@/components/Toast/toast";
import { useNavigate, useParams } from "react-router-dom";
import { GetFirmwareList, DelFirmware } from "@/services/firmware";
import { FirmwareContext } from "@/context/firmware";
import InfoList from "@/components/InfoList/infoList";
const DelColorConfig = {
  normal: "#ff0000",
  active: "#fbe1d9",
  disabled: "#FFF",
};

export default function Firmware({ activeIndex }) {
  const [firmwareList, setFirmwareList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState({});
  const { setCurrentFirmware } = useContext(FirmwareContext);
  const navigate = useNavigate();
  const { productId } = useParams();
  //* 防止没有productId
  if (productId === undefined) navigate("/product");
  useEffect(() => {
    if (activeIndex === 5)
      GetFirmwareList(productId)
        .then((data) => {
          setFirmwareList(data);
        })
        .catch((error) => {
          MyToast("error", "获取固件列表失败");
        });
  }, [activeIndex]);
  function handleLook(data) {
    setCurrentFirmware(data);
    navigate(`/product/${productId}/firmware/${data.id}`);
  }

  function handleDelete(data) {
    DelFirmware(productId, data.id).then((res) => {
      let newList = firmwareList
        .filter((e) => {
          return e.id !== data.id;
        })
        .catch((error) => {
          MyToast("error", "删除失败");
        });

      setFirmwareList(newList);
      MyToast("success", "删除成功");
    });
  }
  let child = (
    <InfoList
      InfoArray={firmwareList}
      handleLook={(data) => handleLook(data)}
      handleDel={(data) => handleDelete(data)}
    ></InfoList>
  );
  function handleCreate() {
    setVisible(!visible);
  }
  function handleCreateConfirm() {}
  return (
    <>
      <Button onClick={handleCreate} className="tabs-under-button">新建固件</Button>
      {/* <table className="table">
        <thead className="TrTable">
          <tr>
            <th>固件名称</th>
            <th>描述</th>
          </tr>
        </thead> */}
      {/* <tbody>{ */}
      {child}
      {/* </tbody>
      </table> */}
      <PopupSwiper
        visible={visible}
        close={() => setVisible(!visible)}
        direction="bottom"
        exitDirection={["bottom", "right"]}
      >
        <Input
          label="固件名称"
          placeholder="请输入固件名称"
          onChange={(e) => setRecord({ ...record, name: e.target.value })}
        ></Input>
        <Input
          label="版本号"
          placeholder="请输入版本号"
          onChange={(e) => setRecord({ ...record, version: e.target.value })}
        ></Input>
        <Uploader></Uploader>
        <Input
          label="描述"
          onChange={(e) =>
            setRecord({ ...record, description: e.target.value })
          }
        ></Input>
        <Button onClick={handleCreateConfirm}>新建</Button>
      </PopupSwiper>
    </>
  );
}
