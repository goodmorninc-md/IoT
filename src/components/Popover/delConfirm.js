import { Dialog, Cell, Button } from "@arco-design/mobile-react";
import { delButtonbgColor } from "@/styles/buttonColorConfig";
export default function DialogDemo({handleDel}) {
  function handleAlert() {
    window.modalInstance = Dialog.confirm({
      title: "确认删除?",
      children: "此操作不可撤销，请确认是否删除",
      platform: "android",
      okText: "确认",
      cancelText: "取消",
      onOk:()=> handleDel()
    });
  }
  return (
    <Button className="tr-button" onClick={handleAlert} bgColor={delButtonbgColor}>
      删除
    </Button>
  );
}
