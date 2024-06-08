import axios from "axios";
import { API_URL } from "./Data";
import MyToast from "@/components/Toast/toast";
//设置全局配置
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";
const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = "Bearer " + token;

/**
 * admin
 * @param {*} productId
 * @returns
 */
export async function ListAllMapofProd(productId) {
  const url = API_URL + `/product/${productId}/mapping`;
  // const response = axios.get(url);
  const response = {
    data: [
      {
        id: "6bd185f99fb725b27d8edc12",
        name: "数据解析1",
        description: "stringToBinary",
        type:1
      },
      {
        id: "6bd185f99fb725b27d8edc122",
        name: "数据解析2",
        description: "BinaryTostring",
        type:2
      },
      {
        id: "6bd185f99fb725b27d8edc123",
        name: "数据解析3",
        description: "BinaryTohexadecimal",
        type:2
      },
    ],
  };
  return response.data;
}
/**
 * admin
 * @param {*} productId
 * @returns
 */
export async function CreateMapping(productId, body) {
  const url = API_URL + `/product/${productId}/mapping`;
  // const response = axios.post(url,body);
  const response = {
    data: body,
  };
  return response.data;
}
/**
 * admin
 * @param {*} productId
 * @param {*} mappingId
 * @returns
 */
export async function ShowDetailsOfMap(productId, mappingId) {
  const url = API_URL + `/product/${productId}/mapping/${mappingId}`;
  // const response = axios.get(url);
  const response = {
    data: {
      id: "6bd185f99fb725b27d8edc12",
      name: "数据解析1",
      description: "stringToBinary",
      type: 2,
      mapping: [null],
      prefix: "plc",
    },
  };
  return response.data;
}
export async function updateMapping(productId, mappingId, newMap) {
  const url = API_URL + `/product/${productId}/mapping/${mappingId}`;
  // const response = axios.put(url);
  const response = {
    data: newMap,
  };
  return response.data;
}
export async function RemoveMapping(productId, mappingId) {
  const url = API_URL + `/product/${productId}/mapping/${mappingId}`;
  // const response = axios.del(url);
  const response = {
    data: {
      code: 0,
      message: "string",
    },
  };
  return response.data;
}
export async function TestAMapping(productId, data) {
  const url = API_URL + `/mapping/test`;
  // const response = axios.get(url);
  const response = {
    data: {
      code: 0,
      message: "string",
    },
  };
  return response.data;
}
