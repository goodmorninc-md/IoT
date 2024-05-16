import { ProductContext } from "@/context/Product";
import { CustormerContext } from "@/context/Custormer";
import { Fragment, useContext, useEffect, useState } from "react";
import { ListAllMapofProd, RemoveMapping } from "@/services/mapping";
import { Button, Input, Textarea } from "@arco-design/mobile-react";
import "@/styles/mapping.less";
import MyDropDown from "@/components/Dropdown/dropdown";
import MyToast from "@/components/Toast/toast";
import { useNavigate } from "react-router-dom";
import {
  GetFirmwareList,
  CreateFirmware,
  ShowDetailOfFirmware,
  UpdateFirmware,
  DelFirmware,
} from "@/services/firmware";
import { FirmwareContext } from "@/context/firmware";
const DelColorConfig = {
  normal: "#ff0000",
  active: "#fbe1d9",
  disabled: "#FFF",
};

export default function Firmware() {
  const [firmwareList, setFirmwareList] = useState([]);

  
  const { setCurrentFirmware } = useContext(FirmwareContext);
  const navigate = useNavigate();
  const url = window.location.href;
  const productId = url.split("/").reverse()[0].split("?")[0];
  if(productId === undefined) navigate("/product")
  console.log(productId);
  useEffect(() => {
    GetFirmwareList(productId).then((data) => {
      setFirmwareList(data);
    });
  }, []);

  function handleDelete(firmwareId) {}
  let child = firmwareList.map((data, idx) => {
    return (
      <tr key={idx}>
        <td>
          {data.name}
          <Button
            onClick={() => {
              setCurrentFirmware(data);
              navigate(`/product/${productId}/firmware/${data.id}`);
            }}
            style={{ width: "30%" }}
          >
            查看
          </Button>
        </td>
        <td>
          {data.description}
          <Button
            style={{ width: "30%", alignItems: "center" }}
            onClick={() => handleDelete(data.id)}
            bgColor={DelColorConfig}
          >
            删除
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Button>新建固件</Button>
      <table className="table">
        <thead className="TrTable">
          <tr>
            <th>监测点名称</th>
            <th>描述</th>
          </tr>
        </thead>
        <tbody>{child}</tbody>
      </table>
    </>
  );
}
