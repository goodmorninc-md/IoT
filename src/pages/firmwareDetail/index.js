import { ProductContext } from "@/context/Product";
import { Fragment, useContext, useEffect, useState } from "react";
import { ShowDetailOfFirmware } from "@/services/firmware";
import * as FirmwareApi from "@/services/firmware";
import {
  ListAllUbOfFirmware,
  DelUB,
} from "@/services/upgradeBatch";
import {
  Button,
  Cell,
  Uploader,
  Tabs,
  PopupSwiper,
  Input,
} from "@arco-design/mobile-react";
import "@/styles/mapping.less";
import MyToast from "@/components/Toast/toast";
import MyTopBar from "@/components/TopBar/TopBar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FirmwareContext } from "@/context/firmware";
import ReturnButton from "@/components/TopBar/return";
import TitleWithButton from "@/components/TopBar/titleWithButton";
import Dialog from "@/components/Popover/delConfirm";
import { IconDownload } from "@arco-design/mobile-react/esm/icon";
import CellNodata from "@/components/InfoList/lackData";

/*
detail of a firmware of a product
{
  "id": "6bd185f99fb725b27d8edc12",
  "name": "string",
  "description": "string",
  "version": "string",
  "file": {
    "id": "6bd185f99fb725b27d8edc12",
    "filename": "string",
    "fd": "string",
    "size": 0,
    "type": "string",
    "product": "6bd185f99fb725b27d8edc12"
  },
  "product": "6bd185f99fb725b27d8edc12",
  "createdBy": {
    "id": "6bd185f99fb725b27d8edc12",
    "fullName": "John Well",
    "email": "john@gmail.com",
    "phone": "13812345678",
    "nickname": "johnW",
    "gender": 0,
    "avatar": "http://wx.qlogo.cn/mmopen/vi_32/aSKcBBPpibyKNicHNTMM0qJVh8Kjgiak2AHWr8MHM4WgMEm7GFhsf8OYrySdbvAMvTsw3mo8ibKicsnfN5pRjl1p8HQ/0",
    "initialPassword": false,
    "activatedAt": "2019-08-24T14:15:22Z",
    "banned": false
  }
}
*/
export default function Firmware({}) {
  const [currentFirmware, setCurrentFirmware] = useState({});
  const navigate = useNavigate();
  const { currentProduct } = useContext(ProductContext);
  const location = useLocation();
  const url = window.location.href;
  const list = url.split("/").reverse();
  const firmwareId = list[0];
  const productId = list[2];
  // const productId = list[]

  //* 获取该硬件数据
  useEffect(() => {
    ShowDetailOfFirmware(productId, firmwareId).then((data) => {
      setCurrentFirmware(data);
    });
  }, []);

  if (Object.keys(currentFirmware).length === 0) return <div>loading</div>;
  function handleDownload() {
    MyToast("error", "开发中");
    FirmwareApi.GetFirmwareFile(productId, firmwareId).then((data) => {
      // 创建一个 URL 对象，指向 Blob
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;

      // 设置下载文件名
      link.setAttribute("download", currentFirmware.file.filename);

      // 将链接添加到文档中
      document.body.appendChild(link);

      // 触发点击事件
      link.click();

      // 从文档中移除链接
      document.body.removeChild(link);

      // 释放 URL 对象
      window.URL.revokeObjectURL(url);
    }).catch(error=>{
      MyToast("error","下载失败")
    });
  }
  return (
    <>
      <MyTopBar
        LeftChildren={
          <ReturnButton
            navigate={() => navigate(`/product/${productId}?tab=firmware`)}
          ></ReturnButton>
        }
        content={currentProduct.name}
      ></MyTopBar>
      <Cell.Group>
        <Cell label="版本" text={currentFirmware.version}></Cell>
        <Cell
          icon={<IconDownload onClick={handleDownload}></IconDownload>}
          label="固件文件"
          text={currentFirmware.file.filename}
        ></Cell>
      </Cell.Group>
      <Tab
        firmwareInfo={currentFirmware}
        setCurrentFirmware={setCurrentFirmware}
      ></Tab>
    </>
  );
}

function Tab({ firmwareInfo, setCurrentFirmware }) {
  const tabData = [{ title: "批次管理" }, { title: "固件信息" }];

  return (
    <Tabs tabs={tabData} type="card" style={{ marginTop: "0.1rem" }}>
      <UpgradeBatch firmwareInfo={firmwareInfo}></UpgradeBatch>
      <FirmwareInfoComp
        firmwareInfo={firmwareInfo}
        setCurrentFirmware={setCurrentFirmware}
      ></FirmwareInfoComp>
    </Tabs>
  );
}
//* 固件信息
function FirmwareInfoComp({ firmwareInfo, setCurrentFirmware }) {
  const [visible, setVisible] = useState(false);
  const handleChangeInfo = () => {
    setVisible(!visible);
  };
  return (
    <>
      <TitleWithButton
        title={"固件信息"}
        handleClick={handleChangeInfo}
      ></TitleWithButton>

      <Cell.Group>
        <Cell label="名称" text={firmwareInfo.name} bordered={false}></Cell>
        <Cell
          label="创建者"
          text={firmwareInfo.createdBy.fullName}
          bordered={false}
        ></Cell>
        <Cell
          label="创建时间"
          text={firmwareInfo.createdBy.activatedAt}
          bordered={false}
        ></Cell>
        <Cell
          label="描述"
          text={firmwareInfo.description}
          bordered={false}
        ></Cell>
      </Cell.Group>
      <EditFirmwarePopup
        firmwareInfo={firmwareInfo}
        setCurrentFirmware={setCurrentFirmware}
        visible={visible}
        setVisible={setVisible}
      ></EditFirmwarePopup>
    </>
  );
}
//* 批次管理
function UpgradeBatch({ firmwareInfo }) {
  const [batchList, setBatchList] = useState([]);
  const navigate = useNavigate();
  const { productId } = useParams();
  useEffect(() => {
    ListAllUbOfFirmware(firmwareInfo.product, firmwareInfo.id).then((data) => {
      setBatchList(data);
    }).catch(error=>{
      MyToast("error","获取更新列表失败")
    });
  }, []);
  function handleDel(batchId) {
    DelUB(productId, batchId).then((res) => {
      let temp = batchList.filter((data) => {
        return data.id !== batchId;
      });
      setBatchList([...temp]);
      MyToast("success", "删除成功");
    }).catch(error=>{
      MyToast("error","删除更新失败")
    });
  }
  // if (batchList.length === 0 || Object.keys(firmwareInfo).length === 0)
  //   return <div>loading</div>;
  let typeList = [0, "批量升级"];
  let statusList = ["", "待升级", "升级中", "已完成", "已取消"];
  let batchListComp = batchList.map((data, idx) => {
    console.log(data);
    return (
      <Fragment key={idx}>
        <tr>
          <td>
            <span className="tr-text">{typeList[data.type]}</span>
            <Button
              onClick={() =>
                navigate(
                  `/product/${firmwareInfo.product}/firmware/${firmwareInfo.id}/upgradebatch/${data.id}`
                )
              }
              className="tr-button"
            >
              查看
            </Button>
          </td>
          <td>
            <span className="tr-text">{statusList[data.status]}</span>
            <Dialog
              content={"删除"}
              handleDel={() => handleDel(data.id)}
            ></Dialog>
          </td>
        </tr>
      </Fragment>
    );
  });
  if (batchListComp.length === 0) batchListComp = <CellNodata></CellNodata>;
  return (
    <>
      <Button
        onClick={() =>
          navigate(
            `/product/${firmwareInfo.product}/firmware/${firmwareInfo.id}/upgrade`
          )
        }
        style={{ marginTop: "0.2rem" }}
      >
        批量升级
      </Button>
      <table className="table">
        <thead className="TrTable">
          <tr>
            <th>类型</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>{batchListComp}</tbody>
      </table>
    </>
  );
}

function EditFirmwarePopup({
  firmwareInfo,
  setCurrentFirmware,
  visible,
  setVisible,
}) {
  const { productId, firmwareId } = useParams();
  const [record, setRecord] = useState({ ...firmwareInfo });
  function handleConfirm() {
    if ("name" in record && "description" in record && record.name.length > 0) {
      FirmwareApi.UpdateFirmware(productId, firmwareId, record).then((res) => {
        setCurrentFirmware({ ...record });
        setVisible(!visible);
        MyToast("success", "修改成功");
      }).catch(error=>{
        MyToast("error","更新固件详情失败")
      });
    } else {
      MyToast("warn", "固件名称不可为空");
    }
  }
  return (
    <PopupSwiper
      visible={visible}
      close={() => setVisible(!visible)}
      direction="bottom"
      allowSwipeDirections={["right", "bottom"]}
    >
      <Cell className="popup-title">修改固件信息</Cell>
      <Input
        label="固件名称"
        required
        defaultValue={firmwareInfo.name}
        onChange={(e) => {
          setRecord({ ...record, name: e.target.value });
        }}
      ></Input>
      <Input
        label="版本号"
        required
        disabled
        defaultValue={firmwareInfo.version}
      ></Input>
      <Input
        label="描述"
        defaultValue={firmwareInfo.description}
        onChange={(e) => {
          setRecord({ ...record, description: e.target.value });
        }}
      ></Input>
      <Button onClick={handleConfirm}>确认</Button>
    </PopupSwiper>
  );
}
