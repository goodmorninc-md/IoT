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
export async function FindDiagramUsage(productId, type = 1) {
  try {
    const url = API_URL + `/product/${productId}/diagramusage?type=${type}`;
    // const response = axios.get(url);
    const response = {
      data: [
        {
          id: "62465e4f9a347c0a1452c446",
          description: "",
          variables: [
            {
              variable: "plc6",
              coordinates: [0.3625220540440152, 0.4175],
            },
            {
              variable: "plc7",
              coordinates: [0.5081251741108738, 0.5225],
            },
            {
              variable: "plc10",
              coordinates: [0.7389110719039218, 0.5275],
            },
            {
              variable: "plc4",
              coordinates: [0.18324202185284924, 0.6675],
            },
          ],
          groups: [
            {
              id: "group1",
              name: "分组1",
              variables: ["plc0", "plc1", "plc2", "plc3"],
            },
            {
              id: "group2",
              name: "分组2",
              useIdentifier: false,
              variables: [
                "plc8",
                "plc9",
                "plc10",
                "plc11",
                "plc12",
                "plc13",
                "plc14",
                "plc15",
                "plc16",
                "plc17",
              ],
            },
          ],
          product: "62451e9b9a347c0a1452c441",
          file: {
            id: "62465e419a347c0a1452c445",
            filename: "海天十分厂-隐藏导出.png",
            fd: "f93248ae-1a2a-4427-a08f-9807f462019f.png",
            size: 1877729,
            type: "image/png",
          },
          usage: "663a22a2f0a52c6498e8f214",
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
export async function UpdateDiagramUsage(productId, id, body) {
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
export async function DelDiagramUsage(productId, id, body) {
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
