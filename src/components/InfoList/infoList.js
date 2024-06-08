import { Button, Cell } from "@arco-design/mobile-react";
import { delButtonbgColor } from "@/styles/buttonColorConfig";
import { Fragment } from "react";
import Dialog from "@/components/Popover/delConfirm";
import CellNodata from "./lackData";
/**
 * 目前仅支持name和description
 * @param {*} InfoArray:展示的数据列表
 * @param {*} handleLook:点击查看的功能
 * @param {*} handleDel:删除

 * @returns
 */
export default function InfoList({
  InfoArray,
  handleLook,
  handleDel,
  lookContent = "查看",
  delContent = "删除",
}) {
  // console.log(InfoArray);
  let child = InfoArray.map((data, idx) => {
    return (
      <Fragment key={idx}>
        <Cell
          label={<span style={{ color: "black" }}>{data.name}</span>}
          desc={data.description}
          text={<Dialog handleDel={() => handleDel(data)} />}
          showArrow
          onClick={() => handleLook(data)}
        ></Cell>
        {/* <tr>
          <td>
            <span className="tr-text">{data.name}</span>
            <Button
              onClick={() => {
                handleLook(data);
              }}
              className="tr-button"
            >
              {lookContent}
            </Button>
          </td>
          <td>
            <span className="tr-text">{data.description}</span>
            <Dialog
              content={delContent}
              handleDel={() => handleDel(data)}
            ></Dialog>
          </td>
        </tr> */}
      </Fragment>
    );
  });

  return <>{child.length > 0 ? child : <CellNodata>暂无内容</CellNodata>}</>;
}
