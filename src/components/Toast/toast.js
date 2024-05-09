import { Toast, Cell } from "@arco-design/mobile-react";

export default function MyToast(type = "error", message = "Error Tips") {
  if (!!window.toastInstance) {
    window.toastInstance.close();
  }
  window.toastInstance = Toast[type](message);
}
