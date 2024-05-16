import axios from "axios";
import { API_URL } from "./Data";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";
const token = localStorage.getItem("token");
//设置全局配置
axios.defaults.headers.common["Authorization"] = "Bearer " + token;

export const GetDiviceList = async (productId, customerId) => {
  try {
    var Url = `${API_URL}/product/${productId}/device`;
    // const response = await axios.get(Url);
    const response = {
      data: [
        {
          id: "6bd185f99fb725b27d8edc12",
          name: "string",
          description: "string",
          status: 1,
          deviceKey: "2158730169",
          activatedAt: "2019-08-24T14:15:22Z",
          period: 0,
          tags: [
            "room:201",
            "truck:浙A12345",
            "manager:张三",
            "coordinate:120.147209,30.275531",
          ],
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
};
/**
 * admin / custormerAdmin/custStuff custormerId仅在cust成员操作时提供
 * @param {*} productId
 * @param {*} customerId
 * @param {*} body
 * @returns
 */
export const CreateDevice = async (productId, customerId, body) => {
  try {
    var Url = `${API_URL}/product/${productId}/device`;
    // const response = await axios.post(Url,body);
    const response = {
      data: {
        id: "6bd185f99fb725b27d8edc12",
        name: "string",
        description: "string",
        status: 1,
        deviceKey: "2158730169",
        activatedAt: "2019-08-24T14:15:22Z",
        period: 0,
        tags: [
          "room:201",
          "truck:浙A12345",
          "manager:张三",
          "coordinate:120.147209,30.275531",
        ],
        frequency: 0,
        deviceSecret: "uqDGsPLy2DP3DiXzDpGbEmQHcBHpR33X",
        lastOnlineAt: "2019-08-24T14:15:22Z",
        mountedAt: "2019-08-24T14:15:22Z",
        firmware: {
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
        customer: {
          id: "6bd185f99fb725b27d8edc12",
          name: "浙江华港染织有限公司",
          description: "string",
          address: "台州中山路123号",
          contact: "李经理",
          phone: "0594-69001200",
        },
        mapping: {
          id: "6bd185f99fb725b27d8edc12",
          name: "string",
          description: "string",
          type: 1,
          mapping: [null],
          prefix: "string",
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
};

export const FindDevice = async (productId, custormerId, deviceId) => {
  try {
    var Url = `${API_URL}/product/${productId}/device/${deviceId}`;
    // const response = await axios.get(Url);
    const response = {
      data: {
        id: "6bd185f99fb725b27d8edc12",
        name: "string",
        description: "string",
        status: 1,
        deviceKey: "2158730169",
        activatedAt: "2019-08-24T14:15:22Z",
        period: 0,
        tags: [
          "room:201",
          "truck:浙A12345",
          "manager:张三",
          "coordinate:120.147209,30.275531",
        ],
        frequency: 0,
        deviceSecret: "uqDGsPLy2DP3DiXzDpGbEmQHcBHpR33X",
        lastOnlineAt: "2019-08-24T14:15:22Z",
        mountedAt: "2019-08-24T14:15:22Z",
        firmware: {
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
        customer: {
          id: "6bd185f99fb725b27d8edc12",
          name: "浙江华港染织有限公司",
          description: "string",
          address: "台州中山路123号",
          contact: "李经理",
          phone: "0594-69001200",
        },
        mapping: {
          id: "6bd185f99fb725b27d8edc12",
          name: "string",
          description: "string",
          type: 1,
          mapping: [null],
          prefix: "string",
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
};

export const UpdateDevice = async (productId, custormerId, deviceId, body) => {
  try {
    var Url = `${API_URL}/product/${productId}/device/${deviceId}`;
    // const response = await axios.put(Url);
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
};

export const DelDivce = async (productId, custormerId, deviceId) => {
  try {
    var Url = `${API_URL}/product/${productId}/device/${deviceId}`;
    // const response = await axios.del(Url);
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
};
