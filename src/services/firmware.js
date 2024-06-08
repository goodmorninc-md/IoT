import axios from "axios";
import { API_URL } from "./Data";
import MyToast from "@/components/Toast/toast";
//设置全局配置
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";
const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = "Bearer " + token;

/**
 * admin
 * @param {*} productId
 * @param {*} page
 * @param {*} size
 * @returns []
 */
export async function GetFirmwareList(productId, page, size) {

    const url = API_URL + `/product/${productId}/firmware`;
    // const response = axios.get(url);
    const response = {
      data: [
        {
          id: "6bd185f99fb725b27d8edc12",
          name: "产品固件",
          description: "固件1",
          version: "v1.0",
        },
      ],
    };
    return response.data;

}
/**
 * admin,body传参
 * @param {*} productId
 * @param {*} body
 * @returns
 */
export async function CreateFirmware(productId, body) {

    const url = API_URL + `/product/${productId}/firmware`;
    // const response = axios.post(url,body);
    const response = {
      data: {
        id: "6bd185f99fb725b27d8edc12",
        name: "string",
        description: "string",
        version: "v1.0",
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
    };
    return response.data;

}
/**
 * admin
 * @param {} productId
 * @param {*} firmwareId
 * @returns
 */
export async function ShowDetailOfFirmware(productId, firmwareId) {

    const url = API_URL + `/product/${productId}/firmware/${firmwareId}`;
    // const response = axios.get(url);
    const response = {
      data: {
        id: "6bd185f99fb725b27d8edc12",
        name: "产品固件",
        description: "固件1",
        version: "v1.0",
        file: {
          id: "6bd185f99fb725b27d8edc12",
          filename: "readme.md",
          fd: "readme.md",
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
    };
    return response.data;

}
/**
 * body传参
 * @param {*} productId
 * @param {*} body
 * @returns
 */
export async function UpdateFirmware(productId, firmwareId, body) {

    const url = API_URL + `/product/${productId}/firmware/${firmwareId}`;
    // const response = axios.put(url);
    const response = {
      data: {
        name: "string",
        description: "string",
        version: "string",
        file: {
          filename: "string",
          fd: "string",
          size: 0,
          type: "string",
        },
        createdBy: {
          fullName: "John Well",
          email: "john@gmail.com",
          phone: "13812345678",
          nickname: "johnW",
          gender: 0,
          avatar:
            "http://wx.qlogo.cn/mmopen/vi_32/aSKcBBPpibyKNicHNTMM0qJVh8Kjgiak2AHWr8MHM4WgMEm7GFhsf8OYrySdbvAMvTsw3mo8ibKicsnfN5pRjl1p8HQ/0",
          initialPassword: false,
          banned: false,
        },
      },
    };
    return response.data;

}
/**
 * admin
 * @param {*} productId
 * @param {*} firmwareId
 * @returns
 */
export async function DelFirmware(productId, firmwareId) {

    const url = API_URL + `/product/${productId}/firmware/${firmwareId}`;
    // const response = axios.del(url);
    const response = {
      data: {
        code: 0,
        message: "string",
      },
    };
    return response.data;

}

export async function GetFirmwareFile(productId, filename) {

    const url1 = "http://localhost:8080/file"; // 替换为你的 API URL
    const response = await axios.get(url1, {
      responseType: "blob", // 关键设置
    });

    
    return response.data;

}
