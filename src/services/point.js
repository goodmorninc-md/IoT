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
 * @returns
 */
export async function ListAllPointOfProd(productId, page, size) {

    const url = API_URL + `/point`;
    // const response = axios.get(url);
    const response = {
      data: [
        {
          id: "6bd185f99fb725b27d8edc12",
          name: "监测点1",
          description:"变量plc1"
        },
      ],
    };
    return response.data;

}
/**
 *
 * @param {*} productId
 * @param {*} body 需要包含name,description,createBy:{}
 * @returns
 */
export async function CreateAPoint(productId, body) {

    const url = API_URL + `/point`;
    // const response = axios.post(url);
    const response = {
      data: [
        {
          id: "6bd185f99fb725b27d8edc12",
          name: "string",
        },
      ],
    };
    return response.data;

}
/**
 * all
 * @param {*} productId
 * @param {*} pointId
 * @returns
 */
export async function ShowDetailsOfPoint(productId, pointId) {

    const url = API_URL + `/point/${pointId}?productId=${productId}`;
    // const response = axios.get(url);
    const response = {
      data: {
        id: "6bd185f99fb725b27d8edc12",
        name: "监测点1",
        description: "变量plc1",
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
 * @param {*} productId
 * @param {*} pointId
 * @returns
 */
export async function UpdatePoint(productId, pointId,body) {

    const url = API_URL + `/point/${pointId}?productId=${productId}`;
    // const response = axios.put(url);
    const response = {
      data:body
    };
    return response.data;

}

export async function DeletePoint(productId, pointId) {

    const url = API_URL + `/point/${pointId}?productId=${productId}`;
    // const response = axios.del(url);
    const response = {
      data: {
        code: 0,
        message: "string",
      },
    };
    return response.data;

}

export async function Bind(productId,pointId,deviceKey)
{

    const url = API_URL + `/point/${pointId}/device?productId=${productId}`;
    // const response = axios.del(url);
    const response = {
      data: {
        code: 0,
        message: "string",
      },
    };
    return response.data;

}