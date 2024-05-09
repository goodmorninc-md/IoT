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
 * @param {*} token
 * @param {*} organizationId
 * @returns
 */
export async function GetProductListByOrg(organizationId) {
  try {
    // var Url = `${API_URL}/product?organizationId=${organizationID}`;

    // const response = await axios.get(Url);

    const response = {
      data: [
        {
          id: "6bd185f99fb725b27d8edc12",
          name: "string",
          description: "string",
          type: 1,
          status: 1,
          organization: "6bd185f99fb725b27d8edc12",
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
 * @param {*} organizationId required
 * @param {*} name required
 * @param {*} description
 * @returns
 */
export async function CreateProductForOrg(
  organizationId,
  name,
  description = ""
) {
  try {
    const payload = {
      organizationId: organizationId,
      name: name,
      description: description,
    };
    // var Url = `${API_URL}/user`;
    // //+ (organizationId !== "" ? "/:" + organizationId : "") +
    // // (customerId !== "" ? "/:" + customerId : "");
    // const response = await axios.post(Url,payload);

    const response = {
      data: {
        id: "6bd185f99fb725b27d8edc12",
        name: "string",
        description: "string",
        type: 1,
        status: 1,
        organization: "6bd185f99fb725b27d8edc12",
        productKey: "a1EB5WDPUh2",
        productSecret: "crJvMzGdYGbAPBSP",
        endDate: "2019-08-24T14:15:22Z",
        specification: [
          {
            variable: "level",
            name: "液位",
            description: "string",
            isWareIdentifier: true,
            dataType: {
              type: "int",
              specs: {
                min: 10,
                max: 30,
                unit: "g/ml",
                unitName: "毫升",
                t: "入站",
                f: "出错",
                switch: {},
                precision: 0,
              },
            },
          },
        ],
        createdAt: "2019-08-24T14:15:22Z",
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
/**
 * admin / custAdmin / custStuff
 * @param {*} organizationId
 * @param {*} customerId
 * @returns
 */
export async function ListProductsOfCust(customerId) {
  try {
    // var Url = `${API_URL}/custormer/${custormerId}/product`;

    // const response = await axios.get(Url);

    const response = {
      data: [
        {
          id: "6bd185f99fb725b27d8edc12",
          name: "string",
          description: "string",
          type: 1,
          status: 1,
          organization: "6bd185f99fb725b27d8edc12",
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
 * @returns
 */
export async function GetOneProduct(productId) {
  const url = `${API_URL}/product/${productId}`;
  // const response = axios.get(url)
  const response = {
    data: {
      id: "6bd185f99fb725b27d8edc12",
      name: "string",
      description: "string",
      type: 1,
      status: 1,
      organization: "6bd185f99fb725b27d8edc12",
      productKey: "a1EB5WDPUh2",
      productSecret: "crJvMzGdYGbAPBSP",
      endDate: "2019-08-24T14:15:22Z",
      specification: [
        {
          variable: "level",
          name: "液位",
          description: "string",
          isWareIdentifier: true,
          dataType: {
            type: "int",
            specs: {
              min: 10,
              max: 30,
              unit: "g/ml",
              unitName: "毫升",
              t: "入站",
              f: "出错",
              switch: {},
              precision: 0,
            },
          },
        },
      ],
      createdAt: "2019-08-24T14:15:22Z",
      updatedAt: "2019-08-24T14:15:22Z",
    },
  };
  return response.data;
}

/**
 * admin
 * @param {*} productId
 * @param {*} body
 * @returns
 */
export async function UpdateOneProduct(productId, body) {
  const url = `${API_URL}/product/${productId}`;
  // const response = axios.put(url,body)
  const response = {
    data: {
      id: "6bd185f99fb725b27d8edc12",
      name: "string",
      description: "string",
      type: 1,
      status: 1,
      organization: "6bd185f99fb725b27d8edc12",
      productKey: "a1EB5WDPUh2",
      productSecret: "crJvMzGdYGbAPBSP",
      endDate: "2019-08-24T14:15:22Z",
      specification: [
        {
          variable: "level",
          name: "液位",
          description: "string",
          isWareIdentifier: true,
          dataType: {
            type: "int",
            specs: {},
          },
        },
      ],
      createdAt: "2019-08-24T14:15:22Z",
      updatedAt: "2019-08-24T14:15:22Z",
    },
  };
  return response.data;
}
/**
 * admin
 * @param {*} productId
 * @returns
 */
export async function DelOneProduct(productId) {
  const url = `${API_URL}/product/${productId}`;
  // const response = axios.del(url)
  const response = {
    data: {
      id: "6bd185f99fb725b27d8edc12",
      name: "string",
      description: "string",
      type: 1,
      status: 1,
      organization: "6bd185f99fb725b27d8edc12",
      productKey: "a1EB5WDPUh2",
      productSecret: "crJvMzGdYGbAPBSP",
      endDate: "2019-08-24T14:15:22Z",
      specification: [
        {
          variable: "level",
          name: "液位",
          description: "string",
          isWareIdentifier: true,
          dataType: {
            type: "int",
            specs: {},
          },
        },
      ],
      createdAt: "2019-08-24T14:15:22Z",
      updatedAt: "2019-08-24T14:15:22Z",
    },
  };
  return response.data;
}
