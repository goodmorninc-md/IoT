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
 * @returns list
 */
export async function GetDiagramList(productId) {
  try {
    const url = API_URL + `/product/${productId}/diagram`;
    // const response = axios.get(url);
    const response = {
      data: [
        {
          id: "6bd185f99fb725b27d8edc12",
          description: "string",
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
 * 开发diagram页新建时需要看一下，是否需要砍掉这个功能
 * @param {*} productId
 * @param {*} body
 * @returns
 */
export async function CreateDiagram(productId, body) {
  try {
    const url = API_URL + `/product/${productId}/diagram`;
    // const response = axios.post(url);
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
 * all
 * @param {*} productId
 * @param {*} diagramId
 * @returns
 */
export async function ShowDetailDiagram(productId, diagramId) {
  try {
    const url = API_URL + `/product/${productId}/diagram/${diagramId}`;
    // const response = axios.post(url);
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
 * @param {*} productId
 * @param {*} diagramId
 * @param {*} body
 * @returns
 */
export async function UpdateDiagram(productId, diagramId, body) {
  try {
    const url = API_URL + `/product/${productId}/diagram/${diagramId}`;
    //   const response = axios.put(url,body);
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
 * @param {*} productId
 * @param {*} diagramId
 * @param {*} body
 * @returns
 */
export async function DelDiagram(productId, diagramId, body) {
  try {
    const url = API_URL + `/product/${productId}/diagram/${diagramId}`;
    //   const response = axios.del(url,body);
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
 * all
 * @param {*} productId
 * @returns
 */
export async function FindDiagramUsage(productId) {
  try {
    const url = API_URL + `/product/${productId}/diagramusage`;
    //   const response = axios.del(url,body);
    const response = {
      data: [
        {
          id: "6bd185f99fb725b27d8edc12",
          description: "string",
          variables: [
            {
              coordinates: [10.5, 20],
              variable: "level",
              group: "station1",
            },
          ],
          groups: [
            {
              id: "station1",
              name: "第一站",
              group: "string",
              variables: ["level", "speed"],
              useIdentifier: true,
            },
          ],
          file: {
            id: "6bd185f99fb725b27d8edc12",
            filename: "string",
            fd: "string",
            size: 0,
            type: "string",
            product: "6bd185f99fb725b27d8edc12",
          },
          usage: "string",
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
 * @param {*} body
 * @returns
 */
export async function CreateDiagramUsage(productId, body) {
  try {
    const url = API_URL + `/product/${productId}/diagramusage`;
    //   const response = axios.post(url,body);
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
 * @param {*} productId 
 * @param {*} body 
 * @returns 
 */
export async function UpdateDiagramUsage(productId, id,body) {
    try {
      const url = API_URL + `/product/${productId}/diagramusage/${id}`;
      //   const response = axios.put(url,body);
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
 * @param {*} productId 
 * @param {*} id 
 * @param {*} body 
 * @returns 
 */
  export async function DelDiagramUsage(productId, id,body) {
    try {
      const url = API_URL + `/product/${productId}/diagramusage/${id}`;
      //   const response = axios.del(url,body);
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
  