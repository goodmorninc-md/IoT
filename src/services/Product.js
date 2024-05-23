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
          id: "62451e9b9a347c0a1452c441",
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
      createdAt: "2022-03-31T03:23:07.574Z",
      updatedAt: "2024-04-14T07:52:00.140Z",
      id: "62451e9b9a347c0a1452c441",
      name: "十分厂产线",
      description: "注塑机部件",
      status: 1,
      type: 1,
      productKey: "MwICF0K4Fb5",
      productSecret: "PHAyBUnhgiPSO85c",
      endDate: null,
      specification: [
        {
          name: "底漆温度",
          variable: "plc0",
          dataType: {
            type: "float",
            specs: {
              unit: "℃",
              unitName: "摄氏度",
              precision: "0",
            },
          },
        },
        {
          name: "底漆湿度",
          variable: "plc1",
          dataType: {
            type: "float",
            specs: {
              unit: "%",
              unitName: "百分之",
              precision: "0",
            },
          },
        },
        {
          name: "面漆温度",
          variable: "plc2",
          dataType: {
            type: "float",
            specs: {
              unit: "℃",
              unitName: "摄氏度",
              precision: "0",
            },
          },
        },
        {
          name: "面漆湿度",
          variable: "plc3",
          dataType: {
            type: "float",
            specs: {
              unit: "%",
              unitName: "百分之",
              precision: "0",
            },
          },
        },
        {
          name: "底漆流平温度",
          variable: "plc4",
          dataType: {
            type: "int",
            specs: {
              unit: "℃",
              unitName: "摄氏度",
              precision: "1",
            },
          },
        },
        {
          name: "面漆流平温度",
          variable: "plc5",
          dataType: {
            type: "int",
            specs: {
              unit: "℃",
              unitName: "摄氏度",
              precision: "1",
            },
          },
        },
        {
          name: "烘干温度",
          variable: "plc6",
          dataType: {
            type: "int",
            specs: {
              unit: "℃",
              unitName: "摄氏度",
              precision: "1",
            },
          },
        },
        {
          name: "固化温度",
          variable: "plc7",
          dataType: {
            type: "int",
            specs: {
              unit: "mm",
              unitName: "摄氏度",
              precision: "1",
            },
          },
        },
        {
          name: "底漆流平温控表设定温度",
          variable: "plc8",
          dataType: {
            type: "int",
            specs: {
              unit: "℃",
              unitName: "摄氏度",
              precision: "1",
            },
          },
        },
        {
          name: "面漆流平温控表设定温度",
          variable: "plc9",
          dataType: {
            type: "int",
            specs: {
              unit: "℃",
              unitName: "摄氏度",
              precision: "1",
            },
          },
        },
        {
          name: "烘干温控表设定温度",
          variable: "plc10",
          dataType: {
            type: "int",
            specs: {
              unit: "℃",
              unitName: "摄氏度",
              precision: "1",
            },
          },
        },
        {
          name: "固化温控表设定温度",
          variable: "plc11",
          dataType: {
            type: "int",
            specs: {
              unit: "℃",
              unitName: "摄氏度",
              precision: "1",
            },
          },
        },
        {
          name: "上件1前小车数量",
          variable: "plc12",
          dataType: {
            type: "int",
            specs: {
              unit: "",
              unitName: "个",
              precision: "0",
            },
          },
        },
        {
          name: "上件2后小车数量",
          variable: "plc13",
          dataType: {
            type: "int",
            specs: {
              unit: "",
              unitName: "个",
              precision: "0",
            },
          },
        },
        {
          name: "上件3前等待小车数量",
          variable: "plc14",
          dataType: {
            type: "int",
            specs: {
              unitName: "个",
            },
          },
        },
        {
          name: "上件3后小车数量",
          variable: "plc15",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "遮蔽小车数量",
          variable: "plc16",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "面漆流平小车数量",
          variable: "plc17",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "面漆流平1小车数量",
          variable: "plc18",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "面漆流平3小车数量",
          variable: "plc19",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "红外预热小车数量",
          variable: "plc20",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "固化小车数量",
          variable: "plc21",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "固化强冷小车数量",
          variable: "plc22",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "下件等待1小车数量",
          variable: "plc23",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "下件等待2小车数量",
          variable: "plc24",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "下件旁通小车数量",
          variable: "plc25",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "慢链小车数量",
          variable: "plc26",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "上件1升降机进口拉力",
          variable: "plc27",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "上件1升降机出口拉力",
          variable: "plc28",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "上件2升降机进口拉力",
          variable: "plc29",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "上件2升降机出口拉力",
          variable: "plc30",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "上件3升降机进口拉力",
          variable: "plc31",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "上件3升降机出口拉力",
          variable: "plc32",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "下件升降机进口拉力",
          variable: "plc33",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "下件升降机出口拉力",
          variable: "plc34",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "屏显快链润滑时间",
          variable: "plc35",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "屏显慢链润滑时间",
          variable: "plc36",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "屏显三号链润滑时间",
          variable: "plc37",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "屏显清洗烘干时间",
          variable: "plc38",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "屏显清洗时间",
          variable: "plc39",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "屏显喷油时间",
          variable: "plc40",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "屏显面漆流平时间1",
          variable: "plc41",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "屏显面漆流平时间2",
          variable: "plc42",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "屏显面漆流平时间3",
          variable: "plc43",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "屏显面漆流平时间4",
          variable: "plc44",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "屏显面漆流平时间5",
          variable: "plc45",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "屏显红外预热时间1",
          variable: "plc46",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "屏显红外预热时间2",
          variable: "plc47",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "屏显红外预热时间3",
          variable: "plc48",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "屏显红外预热时间4",
          variable: "plc49",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "屏显固化时间1",
          variable: "plc50",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "屏显固化时间2",
          variable: "plc51",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "屏显固化时间3",
          variable: "plc52",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "屏显固化时间4",
          variable: "plc53",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "屏显强冷时间1",
          variable: "plc54",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "屏显强冷时间2",
          variable: "plc55",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "屏显强冷时间3",
          variable: "plc56",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "屏显强冷时间4",
          variable: "plc57",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "上件1入口升降机高度",
          variable: "plc58",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "上件1出口升降机高度",
          variable: "plc59",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "上件2入口升降机高度",
          variable: "plc60",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "上件2出口升降机高度",
          variable: "plc61",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "上件3入口升降机高度",
          variable: "plc62",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "上件3出口升降机高度",
          variable: "plc63",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "下件入口升降机高度",
          variable: "plc64",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "下件出口升降机高度",
          variable: "plc65",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "喷漆放车等待时间",
          variable: "plc66",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "A相电压",
          variable: "plc67",
          dataType: {
            type: "float",
            specs: {},
          },
        },
        {
          name: "B相电压",
          variable: "plc68",
          dataType: {
            type: "float",
            specs: {},
          },
        },
        {
          name: "C相电压",
          variable: "plc69",
          dataType: {
            type: "float",
            specs: {},
          },
        },
        {
          name: "AB线电压",
          variable: "plc70",
          dataType: {
            type: "float",
            specs: {},
          },
        },
        {
          name: "BC线电压",
          variable: "plc71",
          dataType: {
            type: "float",
            specs: {},
          },
        },
        {
          name: "AC线电压",
          variable: "plc72",
          dataType: {
            type: "float",
            specs: {},
          },
        },
        {
          name: "A相电流",
          variable: "plc73",
          dataType: {
            type: "float",
            specs: {},
          },
        },
        {
          name: "B相电流",
          variable: "plc74",
          dataType: {
            type: "float",
            specs: {},
          },
        },
        {
          name: "C相电流",
          variable: "plc75",
          dataType: {
            type: "float",
            specs: {},
          },
        },
        {
          name: "有功功率A",
          variable: "plc76",
          dataType: {
            type: "float",
            specs: {},
          },
        },
        {
          name: "有功功率B",
          variable: "plc77",
          dataType: {
            type: "float",
            specs: {},
          },
        },
        {
          name: "有功功率C",
          variable: "plc78",
          dataType: {
            type: "float",
            specs: {},
          },
        },
        {
          name: "总有功功率",
          variable: "plc79",
          dataType: {
            type: "float",
            specs: {},
          },
        },
        {
          name: "无功功率A",
          variable: "plc80",
          dataType: {
            type: "float",
            specs: {},
          },
        },
        {
          name: "无功功率B",
          variable: "plc81",
          dataType: {
            type: "float",
            specs: {},
          },
        },
        {
          name: "无功功率C",
          variable: "plc82",
          dataType: {
            type: "float",
            specs: {},
          },
        },
        {
          name: "总无功功率",
          variable: "plc83",
          dataType: {
            type: "float",
            specs: {},
          },
        },
        {
          name: "视在功率A",
          variable: "plc84",
          dataType: {
            type: "float",
            specs: {},
          },
        },
        {
          name: "视在功率B",
          variable: "plc85",
          dataType: {
            type: "float",
            specs: {},
          },
        },
        {
          name: "视在功率C",
          variable: "plc86",
          dataType: {
            type: "float",
            specs: {},
          },
        },
        {
          name: "总视在功率",
          variable: "plc87",
          dataType: {
            type: "float",
            specs: {},
          },
        },
        {
          name: "功率因数A",
          variable: "plc88",
          dataType: {
            type: "float",
            specs: {},
          },
        },
        {
          name: "功率因数B",
          variable: "plc89",
          dataType: {
            type: "float",
            specs: {},
          },
        },
        {
          name: "功率因数C",
          variable: "plc90",
          dataType: {
            type: "float",
            specs: {},
          },
        },
        {
          name: "总功率因数",
          variable: "plc91",
          dataType: {
            type: "float",
            specs: {},
          },
        },
        {
          name: "频率",
          variable: "plc92",
          dataType: {
            type: "float",
            specs: {},
          },
        },
        {
          name: "总有功电度",
          variable: "plc93",
          dataType: {
            type: "float",
            specs: {},
          },
        },
        {
          name: "总无功电度",
          variable: "plc94",
          dataType: {
            type: "float",
            specs: {},
          },
        },
        {
          name: "面漆流平1-1",
          variable: "plc95",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "面漆流平1-2",
          variable: "plc96",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "面漆流平2",
          variable: "plc97",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "面漆流平3-1",
          variable: "plc98",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "面漆流平3-2",
          variable: "plc99",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "红外预热1-1",
          variable: "plc100",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "红外预热1-2",
          variable: "plc101",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "红外预热1-3",
          variable: "plc102",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "红外预热1-4",
          variable: "plc103",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "固化1-1",
          variable: "plc104",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "固化1-2",
          variable: "plc105",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "固化1-3",
          variable: "plc106",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "固化1-4",
          variable: "plc107",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "固化强冷1",
          variable: "plc108",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "固化强冷2-1",
          variable: "plc109",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "固化强冷2-2",
          variable: "plc110",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "固化强冷2-3",
          variable: "plc111",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "去遮蔽",
          variable: "plc112",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "喷油",
          variable: "plc113",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "下件等待1-1",
          variable: "plc114",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "下件等待1-2",
          variable: "plc115",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "下件等待1-3",
          variable: "plc116",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "下件等待2-1",
          variable: "plc117",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "下件等待2-2",
          variable: "plc118",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "下件前",
          variable: "plc119",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "下件",
          variable: "plc120",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "下件旁通1-1",
          variable: "plc121",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "下件旁通1-2",
          variable: "plc122",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "上件前",
          variable: "plc123",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "上件1前1-1",
          variable: "plc124",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "上件1前1-2",
          variable: "plc125",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "上件1",
          variable: "plc126",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "上件1后",
          variable: "plc127",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "上件2前",
          variable: "plc128",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "上件2",
          variable: "plc129",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "上件2后1-1",
          variable: "plc130",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "上件2后1-2",
          variable: "plc131",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "上件2后1-3",
          variable: "plc132",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "遮蔽前",
          variable: "plc133",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "遮蔽1-1",
          variable: "plc134",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "遮蔽1-2",
          variable: "plc135",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "清洗",
          variable: "plc136",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "烘干",
          variable: "plc137",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "喷漆入口",
          variable: "plc138",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "慢链1",
          variable: "plc139",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "慢链2",
          variable: "plc140",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "慢链3",
          variable: "plc141",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "慢链4",
          variable: "plc142",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "慢链5",
          variable: "plc143",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "慢链6",
          variable: "plc144",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "慢链7",
          variable: "plc145",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "慢链8",
          variable: "plc146",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "慢链9",
          variable: "plc147",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "慢链10",
          variable: "plc148",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "慢链11",
          variable: "plc149",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "慢链12",
          variable: "plc150",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "慢链13",
          variable: "plc151",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "慢链14",
          variable: "plc152",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "慢链15",
          variable: "plc153",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "慢链16",
          variable: "plc154",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "占位开关1",
          variable: "plc155",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "占位开关2",
          variable: "plc156",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "门指示灯",
          variable: "plc157",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "停止器1",
          variable: "plc158",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "停止器2",
          variable: "plc159",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "开关状态",
          variable: "plc160",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "快链暂停状态",
          variable: "plc161",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "慢链暂停状态",
          variable: "plc162",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "输出状态",
          variable: "plc163",
          dataType: {
            type: "int",
            specs: {},
          },
        },
        {
          name: "清洗室排风机",
          variable: "plc164",
          dataType: {
            type: "boolean",
            specs: {},
          },
        },
        {
          name: "喷油室排风机",
          variable: "plc165",
          dataType: {
            type: "boolean",
            specs: {},
          },
        },
        {
          name: "清洗室水泵",
          variable: "plc166",
          dataType: {
            type: "boolean",
            specs: {},
          },
        },
        {
          name: "喷油室水泵",
          variable: "plc167",
          dataType: {
            type: "boolean",
            specs: {},
          },
        },
        {
          name: "烘干循环风机",
          variable: "plc168",
          dataType: {
            type: "boolean",
            specs: {},
          },
        },
        {
          name: "固化排风机",
          variable: "plc169",
          dataType: {
            type: "boolean",
            specs: {},
          },
        },
        {
          name: "固化循环风机",
          variable: "plc170",
          dataType: {
            type: "boolean",
            specs: {},
          },
        },
        {
          name: "底漆送风机Q1.7",
          variable: "plc171",
          dataType: {
            type: "boolean",
            specs: {},
          },
        },
        {
          name: "面漆送风机",
          variable: "plc172",
          dataType: {
            type: "boolean",
            specs: {},
          },
        },
        {
          name: "底漆自动排风机",
          variable: "plc173",
          dataType: {
            type: "boolean",
            specs: {},
          },
        },
        {
          name: "底漆手动排风机",
          variable: "plc174",
          dataType: {
            type: "boolean",
            specs: {},
          },
        },
        {
          name: "面漆自动排风机",
          variable: "plc175",
          dataType: {
            type: "boolean",
            specs: {},
          },
        },
        {
          name: "面漆手动排风机",
          variable: "plc176",
          dataType: {
            type: "boolean",
            specs: {},
          },
        },
        {
          name: "底漆流平风机",
          variable: "plc177",
          dataType: {
            type: "boolean",
            specs: {},
          },
        },
        {
          name: "面漆流平风机",
          variable: "plc178",
          dataType: {
            type: "boolean",
            specs: {},
          },
        },
        {
          name: "强冷送风机",
          variable: "plc179",
          dataType: {
            type: "boolean",
            specs: {},
          },
        },
        {
          name: "强冷排风机",
          variable: "plc180",
          dataType: {
            type: "boolean",
            specs: {},
          },
        },
        {
          name: "红外预热",
          variable: "plc181",
          dataType: {
            type: "boolean",
            specs: {},
          },
        },
        {
          name: "底漆流平加热",
          variable: "plc182",
          dataType: {
            type: "boolean",
            specs: {},
          },
        },
        {
          name: "面漆流平加热",
          variable: "plc183",
          dataType: {
            type: "boolean",
            specs: {},
          },
        },
        {
          name: "烘干加热",
          variable: "plc184",
          dataType: {
            type: "boolean",
            specs: {},
          },
        },
        {
          name: "固化加热",
          variable: "plc185",
          dataType: {
            type: "boolean",
            specs: {},
          },
        },
      ],
      organization: "62451e8b9a347c0a1452c440",
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

export async function GetAllTagKeyOfaProduct(productId) {
  try {
    const url = `${API_URL}/product/${productId}/tags`;
    // const response = axios.get(url)
    const response = {
      data: ["room", "truck", "manager", "coordinate"],
    };
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function GetAllTagValueOfaProduct(productId, key) {
  try {
    const url = `${API_URL}/product/${productId}/tag/${key}/values`;
    // const response = axios.del(url)
    const response = {
      data: ["浙A12345", "浙A22222", "浙A33333"],
    };
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
/**
 *
 * @param {*} organizationId Query for only organization
 * @param {*} productId
 * @param {*} custormerId Query for only one custormer
 * @param {Object} data 查询的所有数据
 * @param {*} start UTC时间
 * @param {*} end
 * @param {*} tags 查询tags
 * @param {*} queries 查询变量列表array
 */
export async function QueryTimeSeriesData(
  organizationId,
  productId,
  custormerId,
  data
) {
  try {
    const url = `${API_URL}/product/query`;
    // const response = axios.post(url,body)
    const response = {
      data: [
        {
          time: "2015-08-18T08:20:00.000Z",
          level: 20,
          temperature: 18,
        },
        {
          time: "2015-08-18T08:22:00.000Z",
          level: 18,
        },
      ],
    };
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
