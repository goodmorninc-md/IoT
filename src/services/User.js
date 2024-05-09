import axios from "axios";
import { API_URL } from "./Data";
//设置全局配置
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";
const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = "Bearer " + token;
/**
 * 各个管理员通过查询id实现
 * @param {*} organizationId
 * @param {*} customerId
 * @param {*} token
 * @returns
 */
export const ListUsers = async (organizationId = "", customerId = "") => {
  try {
    var Url =
      `${API_URL}/user?` +
      (organizationId !== "" ? "organizationId=" + organizationId : "") +
      (customerId !== "" ? "&customerId=" + customerId : "");
    const response = await axios.get(Url);

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
 * admin才可
 * @param {*} data 新添加的用户数据
 * @param {*} organizationId
 * @param {*} customerId
 * @param {*} token
 * @returns
 */
export const AddUser = async (
  data,
  organizationId = "",
  customerId = "",
) => {
  try {
    console.log(data);
    var Url = `${API_URL}/user?`;
    // +(organizationId !== "" ? "organizationId=" + organizationId : "") +
    // (customerId !== "" ? "&customerId=" + customerId : "");
    console.log(Url);
    const response = await axios.post(Url, data);

    // console.log(response.data);
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

export const ChangeUserInfo = async (
  data,
  organizationId = "",
  token
) => {
  try {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    console.log(data);
    var Url = `${API_URL}/user`;
    // +(organizationId !== "" ? "/:organizationId" + organizationId : "") +
    // (customerId !== "" ? "/:customerId" + customerId : "");
    console.log(Url);
    // const response = await axios.post(Url,data);
    const response = {
      status: 200,
      data: data,
    };
    // console.log(response.data);
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
export const DelUser = async (
  data,
  organizationId = "",
  customerId = "",
) => {
  try {
    console.log(data);
    var Url = `${API_URL}/user`;
    // +(organizationId !== "" ? "/:organizationId" + organizationId : "") +
    // (customerId !== "" ? "/:customerId" + customerId : "");
    console.log(Url);
    // const response = await axios.del(Url,data);

    const response = {
      status: 200,
      data: { data: "Yes" },
    };
    // console.log(response.data);
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
