
import { useContext } from "react"
import { AuthContext } from "@/context/AuthContext";
export const API_URL = "http://localhost:8080"


//* 在这里获取token的问题是，一旦设定后就无法更改，登陆成功后token还是为空字符串
const t = localStorage.getItem("token")
export const token = t === null ? "" : t

