import axios from "axios";
import { API_URL } from "./Data";
//设置全局配置
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";
const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = "Bearer " + token;

/**
 * all admin
 * Two id either provided
 * @param {*} OrganizationId
 * @param {*} custormerId
 * @param {required} productId -> required
 * @returns
 */
export async function GetStatsOfInc(OrganizationId, productId,custormerId) {
  try {
    const url = API_URL + `/incident/stats?productId=${productId}`;
    // const response = axios.get(url);
    const response = {
      data: [
        {
          status: 1,
          num: 10,
        },
        {
          status: 2,
          num: 20,
        },
        {
          status: 3,
          num: 40,
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
 * all admin
 * @param {*} OrganizationId
 * @param {*} custormerId
 * @param {*} productId
 * @returns
 */
export async function ListInc(
  OrganizationId,
  custormerId,
  productId,
  status,
  start,
  end
) {
  try {
    const url = API_URL + `/incident`;
    // const response = axios.get(url);
    const response = {
      data: [
        {
          id: "6bd185f99fb725b27d8edc12",
          entityId: "string",
          status: 1,
          numAlerts: 0,
          ackBy: {
            id: "6bd185f99fb725b27d8edc12",
            fullName: "John Well",
          },
          resolvedBy: {
            id: "6bd185f99fb725b27d8edc12",
            fullName: "John Well",
          },
          createdAt: "2019-08-24T14:15:22Z",
          product: {
            id: "6bd185f99fb725b27d8edc12",
            name: "string",
          },
          customer: "6bd185f99fb725b27d8edc12",
          organization: "6bd185f99fb725b27d8edc12",
          device: "6bd185f99fb725b27d8edc12",
        },
        {
          id: "6bd185f99fb725b27d8edc12",
          entityId: "string",
          status: 1,
          numAlerts: 0,
          ackBy: {
            id: "6bd185f99fb725b27d8edc12",
            fullName: "John Well",
          },
          resolvedBy: {
            id: "6bd185f99fb725b27d8edc12",
            fullName: "John Well",
          },
          createdAt: "2019-08-24T14:15:22Z",
          product: {
            id: "6bd185f99fb725b27d8edc12",
            name: "string",
          },
          customer: "6bd185f99fb725b27d8edc12",
          organization: "6bd185f99fb725b27d8edc12",
          device: "6bd185f99fb725b27d8edc12",
        },
        {
          id: "6bd185f99fb725b27d8edc12",
          entityId: "string",
          status: 1,
          numAlerts: 0,
          ackBy: {
            id: "6bd185f99fb725b27d8edc12",
            fullName: "John Well",
          },
          resolvedBy: {
            id: "6bd185f99fb725b27d8edc12",
            fullName: "John Well",
          },
          createdAt: "2019-08-24T14:15:22Z",
          product: {
            id: "6bd185f99fb725b27d8edc12",
            name: "string",
          },
          customer: "6bd185f99fb725b27d8edc12",
          organization: "6bd185f99fb725b27d8edc12",
          device: "6bd185f99fb725b27d8edc12",
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

export async function GetOneInc(incidentId, OrganizationId, custormerId) {
  try {
    const url = API_URL + `/incident/${incidentId}`;
    // const response = axios.get(url);
    const response = {
      data: {
        id: "6bd185f99fb725b27d8edc12",
        entityId: "string",
        status: 1,
        numAlerts: 0,
        ackBy: {
          id: "6bd185f99fb725b27d8edc12",
          fullName: "John Well",
        },
        resolvedBy: {
          id: "6bd185f99fb725b27d8edc12",
          fullName: "John Well",
        },
        createdAt: "2019-08-24T14:15:22Z",
        product: {
          id: "6bd185f99fb725b27d8edc12",
          name: "string",
        },
        customer: "6bd185f99fb725b27d8edc12",
        organization: "6bd185f99fb725b27d8edc12",
        device: "6bd185f99fb725b27d8edc12",
        ackMessage: "string",
        ackAt: "2019-08-24T14:15:22Z",
        resolvedMessage: "string",
        resolvedAt: "2019-08-24T14:15:22Z",
        recipients: [
          {
            id: "6bd185f99fb725b27d8edc12",
            fullName: "string",
          },
        ],
        updatedAt: "2019-08-24T14:15:22Z",
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

export async function AcknowLedgeOrResInc(incidentId, status, message) {
  try {
    const url = API_URL + `/incident/${incidentId}`;
    // const response = axios.put(url);
    const response = {
      data: {
        status: 2,
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
