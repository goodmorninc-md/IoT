import { ProductContext } from "@/context/Product";
import { Fragment, useContext, useEffect, useState } from "react";
import {
  ListAllPointOfProd,
  CreateAPoint,
  ShowDetailsOfPoint,
  UpdatePoint,
  DeletePoint,
} from "@/services/point";
import { Button, Input, Textarea } from "@arco-design/mobile-react";

import MyDropDown from "@/components/Dropdown/dropdown";
import MyToast from "@/components/Toast/toast";

export default function Point({}) {
  const { currentProduct } = useContext(ProductContext);
  const [pointList, setPointList] = useState([]);
  useEffect(() => {
    ListAllPointOfProd(currentProduct.id).then((data) => {
      setPointList(data);
    });
  }, []);
  function handleChange() {}
  function handleDelete() {}
  const DelColorConfig = {
    normal: "#ff0000",
    active: "#fbe1d9",
    disabled: "#FFF",
  };
  let child = pointList.map((data, idx) => {
    return (
      <Fragment key={idx}>
        <tr>
          <td>
            {data.name}
            <Button
              onClick={() => {
                handleChange(data.id);
              }}
              style={{ width: "30%" }}
            >
              编辑
            </Button>
          </td>
          <td>
            {data.description}
            <Button
              onClick={() => {
                handleChange(data.id);
              }}
              style={{ width: "30%" }}
            >
              编辑
            </Button>
          </td>
         
        </tr>
      </Fragment>
    );
  });
  return (
    <>
      <table className="table">
        <thead className="TrTable">
          <tr>
            <th>监测点名称</th>
            <th>描述</th>
          </tr>
        </thead>
        <tbody>{child}</tbody>
      </table>

      <Button>新建监测点</Button>
    </>
  );
}
