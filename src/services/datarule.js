import axios from "axios";
import { API_URL } from "./Data";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";
const token = localStorage.getItem("token");
//设置全局配置
axios.defaults.headers.common["Authorization"] = "Bearer " + token;

export async function ListDataRules(productId, userType, id) {
  try {
    const url = `${API_URL}/datarule?productId=${productId}`;
    //   const response = axios.get(url);
    const response = {
      data: [
        {
          id: "6bd185f99fb725b27d8edc12",
          description: "string",
          status: 1,
          type: 3,
        },
      ],
    };
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function CreateDataRule(productId, userType, id, body) {
  try {
    const url = `${API_URL}/datarule?productId=${productId}`;
    //   const response = axios.get(url,body);
    const response = {
      data: {
        id: "6bd185f99fb725b27d8edc12",
        description: "string",
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
  } catch (error) {
    console.error(error);
  }
}

export async function GetDataRule(productId, userType, id, dataruleId) {
  try {
    const url = `${API_URL}/datarule/${dataruleId}?productId=${productId}`;
    //   const response = axios.get(url,body);
    const response = {
      data: {
        id: "6bd185f99fb725b27d8edc12",
        description: "string",
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
  } catch (error) {
    console.error(error);
  }
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
  try {
    const url = `${API_URL}/datarule/${dataruleId}?productId=${productId}`;
    //   const response = axios.put(url,body);
    const response = {
      data: body,
    };
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function RemoveDatarule(productId, userType, id, dataruleId) {
  try {
    const url = `${API_URL}/datarule/${dataruleId}?productId=${productId}`;
    //   const response = axios.put(url,body);
    const response = {
      data: {
        code: 0,
        message: "string",
      },
    };
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function UpdateStatusDatarule(productId, status, dataruleId) {
  try {
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
  } catch (error) {
    console.error(error);
  }
}
