import axios from "axios";
import { API_URL } from "./Data";
//设置全局配置
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";
const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = "Bearer " + token;
/**
 * admin
 * @param {*} productId
 * @param {*} firmwareId
 * @returns
 */
export async function ListAllUbOfFirmware(productId, firmwareId) {
  try {
    const url = API_URL + `/product/${productId}/upgradebatch/${firmwareId}`;
    // const response = axios.get(url);
    const response = {
      data: [
        {
          id: "6bd185f99fb725b27d8edc12",
          type: 1,
          status: 1,
          startTime: "2019-08-24T14:15:22Z",
          createdAt: "2019-08-24T14:15:22Z",
        },
      ],
    };
    return response.data;
  } catch (error) {
    if (error.response) {
      // 请求发送成功，但服务器返回错误状态码
      console.error("Server error:", error.response.data);
      throw new Error("Server error: " + error.response.data);
    } else if (error.request) {
      // 请求发送失败，没有收到服务器响应
      console.error("Network error:", error.request);
      throw new Error("Network error: " + error.request);
    } else {
      // 其他错误，如请求设置错误或者未知错误
      console.error("Error:", error.message);
      throw new Error("Error: " + error.message);
    }
  }
}

/**
 * admin
 * @param {*} productId
 * @param {*} firmwareId
 * @param {*} body
 * @returns
 */
export async function CreateUB(productId, firmwareId, body) {
  try {
    const url = API_URL + `/product/${productId}/upgradebatch/${firmwareId}`;
    // const response = axios.post(url,body);
    const response = {
      data: body,
    };
    return response.data;
  } catch (error) {
    if (error.response) {
      // 请求发送成功，但服务器返回错误状态码
      console.error("Server error:", error.response.data);
      throw new Error("Server error: " + error.response.data);
    } else if (error.request) {
      // 请求发送失败，没有收到服务器响应
      console.error("Network error:", error.request);
      throw new Error("Network error: " + error.request);
    } else {
      // 其他错误，如请求设置错误或者未知错误
      console.error("Error:", error.message);
      throw new Error("Error: " + error.message);
    }
  }
}
/**
 * admin
 * @param {*} productId
 * @param {*} batchId
 * @returns
 */
export async function ShowDetailOfUB(productId, batchId) {
  try {
    const url = API_URL + `/product/${productId}/upgradebatch/${batchId}`;
    // const response = axios.post(url,body);
    const response = {
      data: {
        id: "6bd185f99fb725b27d8edc12",
        type: 1,
        status: 1,
        startTime: "2019-08-24T14:15:22Z",
        createdAt: "2019-08-24T14:15:22Z",
        scope: 1,
        scheduleType: 1,
        firmware: "6bd185f99fb725b27d8edc12",
        product: "6bd185f99fb725b27d8edc12",
      },
    };
    return response.data;
  } catch (error) {
    if (error.response) {
      // 请求发送成功，但服务器返回错误状态码
      console.error("Server error:", error.response.data);
      throw new Error("Server error: " + error.response.data);
    } else if (error.request) {
      // 请求发送失败，没有收到服务器响应
      console.error("Network error:", error.request);
      throw new Error("Network error: " + error.request);
    } else {
      // 其他错误，如请求设置错误或者未知错误
      console.error("Error:", error.message);
      throw new Error("Error: " + error.message);
    }
  }
}

export async function DelUB(productId, batchId) {
  try {
    const url = API_URL + `/product/${productId}/upgradebatch/${batchId}`;
    // const response = axios.del(url);
    const response = {
      data: {
        code: 0,
        message: "string",
      },
    };
    return response.data;
  } catch (error) {
    if (error.response) {
      // 请求发送成功，但服务器返回错误状态码
      console.error("Server error:", error.response.data);
      throw new Error("Server error: " + error.response.data);
    } else if (error.request) {
      // 请求发送失败，没有收到服务器响应
      console.error("Network error:", error.request);
      throw new Error("Network error: " + error.request);
    } else {
      // 其他错误，如请求设置错误或者未知错误
      console.error("Error:", error.message);
      throw new Error("Error: " + error.message);
    }
  }
}
