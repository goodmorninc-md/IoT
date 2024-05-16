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
 * @param {*} productId
 * @param {*} OrganizationId
 * @param {*} custormerId
 * @returns
 */
export async function GetAlertRules(productId, OrganizationId, custormerId) {
  try {
    const url = API_URL + `/alertrule?productId=${productId}`;
    // const response = axios.get(url);
    const response = {
      data: [
        {
          id: "6bd185f99fb725b27d8edc12",
          description: "string",
          status: 1,
          type: 1,
        },
        {
          id: "6bd185f99fb725b27d8edc123",
          description: "string",
          status: 1,
          type: 2,
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
 * @param {*} productId
 * @param {*} OrganizationId
 * @param {*} custormerId
 * @param {*} body
 * @returns
 */
export async function CreateAL(productId, OrganizationId, custormerId, body) {
  try {
    const url = API_URL + `/alertrule?productId=${productId}`;
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
 * all admin
 * @param {*} productId
 * @param {*} OrganizationId
 * @param {*} custormerId
 * @param {*} body
 * @returns
 */
export async function ShowDetailOfAR(
  alertruleId,
  productId,
  OrganizationId,
  custormerId,
  body
) {
  try {
    const url = API_URL + `/alertrule/${alertruleId}?productId=${productId}`;
    // const response = axios.get(url);
    const data = [
      {
        id: "6bd185f99fb725b27d8edc12",
        description: "string",
        status: 1,
        type: 1,
        entityId: "string",
        window: 0,
        consecutive: 0,
        metric: 1,
        operator: "<",
        threshold: 0,
        product: "6bd185f99fb725b27d8edc12",
        organization: "6bd185f99fb725b27d8edc12",
        customer: "6bd185f99fb725b27d8edc12",
        device: "6bd185f99fb725b27d8edc12",
        variable: "string",
        script: "string",
        routing: {
          id: "6bd185f99fb725b27d8edc12",
          routingKey: "string",
        },
      },
      {
        id: "6bd185f99fb725b27d8edc123",
        description: "string",
        status: 1,
        type: 2,
        entityId: "string",
        window: 0,
        consecutive: 0,
        metric: 1,
        operator: "<",
        threshold: 0,
        product: "6bd185f99fb725b27d8edc12",
        organization: "6bd185f99fb725b27d8edc12",
        customer: "6bd185f99fb725b27d8edc12",
        device: "6bd185f99fb725b27d8edc12",
        variable: "string",
        script: "string",
        routing: {
          id: "6bd185f99fb725b27d8edc12",
          routingKey: "string",
        },
      },
    ];
    let responseData = data.find((e) => e.id === alertruleId);
    if (responseData === undefined) responseData = {};
    console.log(responseData)
    const response = { data: responseData };
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
 * can not update type/status
 * @param {*} alertruleId
 * @param {*} productId
 * @param {*} OrganizationId
 * @param {*} custormerId
 * @param {*} body
 * @returns
 */
export async function updateAR(
  alertruleId,
  productId,
  OrganizationId,
  custormerId,
  body
) {
  try {
    const url = API_URL + `/alertrule/${alertruleId}?productId=${productId}`;
    // const response = axios.put(url,body);
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

export async function DelAR(
  alertruleId,
  productId,
  OrganizationId,
  custormerId
) {
  try {
    const url = API_URL + `/alertrule/${alertruleId}?productId=${productId}`;
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

/**
 * admin
 * enable/disable,If type is not 1 (single point), enable/disable the related kapacitor task.
 * @param {*} alertruleId
 * @param {*} productId
 * @param {*} OrganizationId
 * @param {*} custormerId
 * @param {*} body
 * @returns
 */
export async function UpdateStatus(
  alertruleId,
  productId,
  OrganizationId,
  custormerId,
  body
) {
  try {
    const url = API_URL + `/alertrule/${alertruleId}?productId=${productId}`;
    // const response = axios.put(url,body);
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
