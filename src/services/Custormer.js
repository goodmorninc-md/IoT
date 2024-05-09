import axios from "axios";
import { API_URL } from "./Data";
//设置全局配置
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";
const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = "Bearer " + token;
/**
 * admin / orgAdmin / orgStuff
 * @param {*} organizationId
 * @param {*} customerId
 * @param {*} token
 * @returns [list]
 */
export const ListCustormersOfProd = async (productId) => {
  try {
    var Url = `${API_URL}/custormer?productId=${productId}`;
    // const response = await axios.get(Url);
    const response = {
      data: [
        {
          id: "6bd185f99fb725b27d8edc12",
          name: "浙江华港染织有限公司",
          description:
            "浙江华港染织有限公司浙江华港染织有限公司浙江华港染织有限公司",
          address: "台州中山路123号",
          contact: "李经理",
          phone: "0594-69001200",
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
 * admin / orgAdmin / orgStaff
 * @param {*} token
 * @param {*} customerId 查询的客户id
 * @returns
 */
export const GetOneCust = async (customerId) => {
  try {
    var Url = `${API_URL}/custormer/${customerId}`;
    // const response = await axios.get(Url);
    const response = {
      data: {
        id: "6bd185f99fb725b27d8edc12",
        name: "浙江华港染织有限公司",
        description: "string",
        address: "台州中山路123号",
        contact: "李经理",
        phone: "0594-69001200",
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
/**
 * admin
 * @param {*} organizationId
 * @param {*} customerId
 * @param {*} token
 * @returns
 */
export const UpdateCustormers = async (customerId = "") => {
  try {
    var Url = `${API_URL}/custormer/${customerId}`;
    const response = await axios.put(Url);

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
 * admin / orgAdmin
 * @param {*} data
 * @param {*} organizationId
 * @param {*} customerId
 * @param {*} token
 * @returns
 */
export const AddCustormer = async (data, productId = "") => {
  try {
    console.log(data);
    var Url = `${API_URL}/product/${productId}/custormer`;
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

/**
 * remove a custormer from a product
 * admin / orgAdmin
 * @param {*} token
 * @param {*} productId
 * @param {*} customerId
 * @returns
 */
export const DelCustormer = async (productId, customerId) => {
  try {
    var Url = `${API_URL}/product/${productId}/custormer/${customerId}`;

    console.log(Url);
    // const response = await axios.del(Url,data);

    const response = {
      status: 200,
      data: { data: "Yes" },
    };
    // response.data.id = customerId
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
