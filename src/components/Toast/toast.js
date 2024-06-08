import { Toast, Cell } from "@arco-design/mobile-react";

/**
 * type:success / warn / error
 * @param {*} type 
 * @param {*} message 
 */
export default function MyToast(type = "error", message = "Error Tips") {
  if (!!window.toastInstance) {
    window.toastInstance.close();
  }
  window.toastInstance = Toast[type](message);
}
