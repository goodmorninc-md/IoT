import { Dialog, Cell, Button } from "@arco-design/mobile-react";
import { delButtonbgColor } from "@/styles/buttonColorConfig";
import { IconDelete } from "@arco-design/mobile-react/esm/icon";
export default function DialogDemo({ handleDel, content }) {
  function handleAlert(e) {
    e.stopPropagation();
    window.modalInstance = Dialog.confirm({
      title: "确认删除?",
      children: "此操作不可撤销，请确认是否删除",
      platform: "android",
      okText: "确认",
      cancelText: "取消",
      onOk: () => handleDel(),
    });
  }
  return (
    <IconDelete className="cell-text-icon" onClick={(e) => handleAlert(e)}>
      {/* {content} */}
    </IconDelete>
  );
}
