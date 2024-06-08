import axios from "axios";
import { API_URL } from "./Data";
import MyToast from "@/components/Toast/toast";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";
const token = localStorage.getItem("token");
//设置全局配置
axios.defaults.headers.common["Authorization"] = "Bearer " + token;

export async function ListDataRules(productId, userType, id) {
  const url = `${API_URL}/datarule?productId=${productId}`;
  //   const response = axios.get(url);
  const response = {
    data: [
      {
        id: "6bd185f99fb725b27d8edc12",
        description: "ToString",
        status: 1,
        type: 3,
      },
    ],
  };
  return response.data;
}

export async function CreateDataRule(productId, userType, id, body) {
  const url = `${API_URL}/datarule?productId=${productId}`;
  //   const response = axios.get(url,body);
  const response = {
    data: {
      id: "6bd185f99fb725b27d8edc12",
      description: "ToString",
      status: 1,
      type: 3,
      product: "6bd185f99fb725b27d8edc12",
      organization: "6bd185f99fb725b27d8edc12",
      customer: "6bd185f99fb725b27d8edc12",
      device: "6bd185f99fb725b27d8edc12",
      script: "string",
    },
  };
  return response.data;
}

export async function GetDataRule(productId, userType, id, dataruleId) {
  const url = `${API_URL}/datarule/${dataruleId}?productId=${productId}`;
  //   const response = axios.get(url,body);
  const response = {
    data: {
      id: "6bd185f99fb725b27d8edc12",
      description: "ToString",
      status: 1,
      type: 3,
      product: "6bd185f99fb725b27d8edc12",
      organization: "6bd185f99fb725b27d8edc12",
      customer: "6bd185f99fb725b27d8edc12",
      device: "6bd185f99fb725b27d8edc12",
      script: "string",
    },
  };
  return response.data;
}
/**
 * 只可更新description和script
 * @param {*} productId
 * @param {*} userType
 * @param {*} id
 * @param {*} dataruleId
 * @returns
 */
export async function UpdateDataRule(
  productId,
  userType,
  id,
  dataruleId,
  body
) {
  const url = `${API_URL}/datarule/${dataruleId}?productId=${productId}`;
  //   const response = axios.put(url,body);
  const response = {
    data: body,
  };
  return response.data;
}

export async function RemoveDatarule(productId, userType, id, dataruleId) {
  const url = `${API_URL}/datarule/${dataruleId}?productId=${productId}`;
  //   const response = axios.put(url,body);
  const response = {
    data: {
      code: 0,
      message: "string",
    },
  };
  return response.data;
}

export async function UpdateStatusDatarule(productId, status, dataruleId) {
  const body = {
    status: status,
  };
  const url = `${API_URL}/datarule/${dataruleId}?productId=${productId}`;
  //   const response = axios.post(url,body);
  const response = {
    data: {
      code: 0,
      message: "string",
    },
  };
  return response.data;
}
