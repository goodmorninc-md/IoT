import axios from "axios";
import { API_URL } from "./Data";
//设置全局配置
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";
const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = "Bearer " + token;

/**
 * admin
 * @param {*} productId
 * @param {*} page
 * @param {*} size
 * @returns []
 */
export async function GetFirmwareList(productId, page, size) {
  try {
    const url = API_URL + `/product/${productId}/firmware`;
    // const response = axios.get(url);
    const response = {
      data: [
        {
          id: "6bd185f99fb725b27d8edc12",
          name: "string",
          description: "string",
          version: "string",
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
 * admin,body传参
 * @param {*} productId
 * @param {*} body
 * @returns
 */
export async function CreateFirmware(productId, body) {
  try {
    const url = API_URL + `/product/${productId}/firmware`;
    // const response = axios.post(url,body);
    const response = {
      data: {
        id: "6bd185f99fb725b27d8edc12",
        name: "string",
        description: "string",
        version: "string",
        file: {
          id: "6bd185f99fb725b27d8edc12",
          filename: "string",
          fd: "string",
          size: 0,
          type: "string",
          product: "6bd185f99fb725b27d8edc12",
        },
        product: "6bd185f99fb725b27d8edc12",
        createdBy: {
          id: "6bd185f99fb725b27d8edc12",
          fullName: "John Well",
          email: "john@gmail.com",
          phone: "13812345678",
          nickname: "johnW",
          gender: 0,
          avatar:
            "http://wx.qlogo.cn/mmopen/vi_32/aSKcBBPpibyKNicHNTMM0qJVh8Kjgiak2AHWr8MHM4WgMEm7GFhsf8OYrySdbvAMvTsw3mo8ibKicsnfN5pRjl1p8HQ/0",
          initialPassword: false,
          activatedAt: "2019-08-24T14:15:22Z",
          banned: false,
        },
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
/**
 * admin
 * @param {} productId
 * @param {*} firmwareId
 * @returns
 */
export async function ShowDetailOfFirmware(productId, firmwareId) {
  try {
    const url = API_URL + `/product/${productId}/firmware/${firmwareId}`;
    // const response = axios.get(url);
    const response = {
      data: {
        id: "6bd185f99fb725b27d8edc12",
        name: "string",
        description: "string",
        version: "string",
        file: {
          id: "6bd185f99fb725b27d8edc12",
          filename: "string",
          fd: "string",
          size: 0,
          type: "string",
          product: "6bd185f99fb725b27d8edc12",
        },
        product: "6bd185f99fb725b27d8edc12",
        createdBy: {
          id: "6bd185f99fb725b27d8edc12",
          fullName: "John Well",
          email: "john@gmail.com",
          phone: "13812345678",
          nickname: "johnW",
          gender: 0,
          avatar:
            "http://wx.qlogo.cn/mmopen/vi_32/aSKcBBPpibyKNicHNTMM0qJVh8Kjgiak2AHWr8MHM4WgMEm7GFhsf8OYrySdbvAMvTsw3mo8ibKicsnfN5pRjl1p8HQ/0",
          initialPassword: false,
          activatedAt: "2019-08-24T14:15:22Z",
          banned: false,
        },
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
/**
 * body传参
 * @param {*} productId
 * @param {*} body
 * @returns
 */
export async function UpdateFirmware(productId, firmwareId, body) {
  try {
    const url = API_URL + `/product/${productId}/firmware/${firmwareId}`;
    // const response = axios.put(url);
    const response = {
      data: {
        name: "string",
        description: "string",
        version: "string",
        file: {
          filename: "string",
          fd: "string",
          size: 0,
          type: "string",
        },
        createdBy: {
          fullName: "John Well",
          email: "john@gmail.com",
          phone: "13812345678",
          nickname: "johnW",
          gender: 0,
          avatar:
            "http://wx.qlogo.cn/mmopen/vi_32/aSKcBBPpibyKNicHNTMM0qJVh8Kjgiak2AHWr8MHM4WgMEm7GFhsf8OYrySdbvAMvTsw3mo8ibKicsnfN5pRjl1p8HQ/0",
          initialPassword: false,
          banned: false,
        },
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
/**
 * admin
 * @param {*} productId 
 * @param {*} firmwareId 
 * @returns 
 */
export async function DelFirmware(productId, firmwareId) {
  try {
    const url = API_URL + `/product/${productId}/firmware/${firmwareId}`;
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
