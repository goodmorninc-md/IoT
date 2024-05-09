import { OrganizationContext } from "@/context/Organization";
import axios from "axios";
import { API_URL } from "./Data";

//设置全局配置
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
// * token通过全局的context传入(AuthContext)

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";

/**
 * permission : 仅admin
 * @param {*} token 
 * @returns 
 */
export const GetOrganizationList = async (token) => {
  try {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    const response = await axios.get(`${API_URL}/organizations`);
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
 * 仅admin
 * @param {*} body :name required
 * @param {*} token 
 * @returns 
 */
export const CreateOrganization = async (body, token) => {
  try {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    // const response = await axios.post(`${API_URL}/organization`, body);
    const response = {
      data: {
        id: "6bd185f99fb725b27d8edc12",
        name: "绿源天然气有限公司",
        description: "string",
        address: "宁波莫干山路123号",
        contact: "张三",
        phone: "0574-87155701",
        createdAt: "2019-08-24T14:15:22Z",
        updatedAt: "2019-08-24T14:15:22Z",
      },
    };
    
    console.log(response.data);
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
 * admin / orgAdmin / orgStuff
 * @param {*} OrganizationId 
 * @param {*} token 
 * @returns 
 */
export const GetOneOrganization = async (OrganizationId, token) => {
  try {
    console.log(token);
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    const response = await axios.get(
      `${API_URL}/organizations/${OrganizationId}`
    );
    console.log(response);
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
 * admin
 * @param {*} OrganizationId 
 * @param {*} token 
 * @param {*} data 
 * @returns 
 */
export const UpdateOneOrganization = async (OrganizationId, token, data) => {
  try {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    // const response = await axios.put(
    //   `${API_URL}/organizations/${OrganizationId}`
    // );
    const response = {
      data: data,
    };
    console.log(response.data);
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
 * admin
 * @param {*} OrganizationId 
 * @param {*} token 
 * @returns 
 */
export const DeleteOneOrganization = async (OrganizationId, token) => {
  try {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    const response = await axios.delete(
      `${API_URL}/organizations/${OrganizationId}`
    );
    console.log(response.data);
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
