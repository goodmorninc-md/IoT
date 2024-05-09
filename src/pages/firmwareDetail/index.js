import { ProductContext } from "@/context/Product";
import { Fragment, useContext, useEffect, useState } from "react";
import {
  GetFirmwareList,
  CreateFirmware,
  ShowDetailOfFirmware,
  UpdateFirmware,
  DelFirmware,
} from "@/services/firmware";

import {
  ListAllUbOfFirmware,
  CreateUB,
  ShowDetailOfUB,
  DelUB,
} from "@/services/upgradeBatch";
import { Button, Cell, Uploader, Tabs } from "@arco-design/mobile-react";
import "@/styles/mapping.less";
import MyToast from "@/components/Toast/toast";
import MyTopBar from "@/components/TopBar/TopBar";
import { useLocation, useNavigate } from "react-router-dom";
import { FirmwareContext } from "@/context/firmware";

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
  const list = url.split("/")
  const firmwareId = list.slice(-1)[0];
  // const productId = list[]

  //* 获取该硬件数据
  useEffect(() => {
    ShowDetailOfFirmware(currentProduct.id, firmwareId).then((data) => {
      setCurrentFirmware(data);
    });
  }, []);

  if (Object.keys(currentFirmware).length === 0) return <div>loading</div>;
  return (
    <>
      <MyTopBar
        LeftChildren={
          <Button
            onClick={() =>
              navigate(`/product/${currentProduct.id}?tab=firmware`)
            }
          >
            返回
          </Button>
        }
      ></MyTopBar>
      <Uploader></Uploader>
      <Cell.Group>
        <Cell label="版本" text={currentFirmware.version}></Cell>
        <Cell label="固件文件" text={currentFirmware.file.filename}></Cell>
      </Cell.Group>
      <Tab firmwareInfo={currentFirmware}></Tab>
    </>
  );
}

function Tab({ firmwareInfo }) {
  const tabData = [
    { title: "批次管理" },
    { title: "设备列表" },
    { title: "固件信息" },
  ];

  return (
    <Tabs
      tabs={tabData}
      type="card"
      onChange={(tab, index) => {
        console.log("[tabs]", tab, index);
      }}
    >
      <UpgradeBatch firmwareInfo={firmwareInfo}></UpgradeBatch>
      <div>TODO</div>
      <FirmwareInfoComp firmwareInfo={firmwareInfo}></FirmwareInfoComp>
    </Tabs>
  );
}
//* 固件信息
function FirmwareInfoComp({ firmwareInfo }) {
  const handleChangeInfo = () => {};
  return (
    <>
      <div>
        <h1>固件信息</h1>
        <Button onClick={handleChangeInfo}>编辑</Button>
      </div>
      <Cell.Group>
        <Cell label="名称" text={firmwareInfo.name}></Cell>
        <Cell label="创建者" text={firmwareInfo.createdBy.fullName}></Cell>
        <Cell label="创建时间" text={firmwareInfo.createdBy.activatedAt}></Cell>
        <Cell label="描述" text={firmwareInfo.description}></Cell>
      </Cell.Group>
    </>
  );
}
//* 批次管理
function UpgradeBatch({ firmwareInfo }) {
  const [batchList, setBatchList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    ListAllUbOfFirmware(firmwareInfo.product, firmwareInfo.id).then((data) => {
      setBatchList(data);
    });
  }, []);

  if (batchList.length === 0 || Object.keys(firmwareInfo).length === 0)
    return <div>loading</div>;
  let typeList = [0, "批量升级"];
  let statusList = ["", "待升级", "升级中", "已完成", "已取消"];
  let batchListComp = batchList.map((data, idx) => {
    console.log(data);
    return (
      <Fragment key={idx}>
        <tr>
          <td>
            {typeList[data.type]}
            <Button
              onClick={() =>
                navigate(
                  `/product/${firmwareInfo.product}/firmware/${firmwareInfo.id}/upgradebatch/${data.id}`
                )
              }
            >
              查看
            </Button>
          </td>
          <td>
            {statusList[data.status]}
            <Button>删除</Button>
          </td>
        </tr>
      </Fragment>
    );
  });
  return (
    <>
      <Button
        onClick={() =>
          navigate(
            `/product/${firmwareInfo.product}/firmware/${firmwareInfo.id}/upgrade`
          )
        }
      >
        批次升级
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
