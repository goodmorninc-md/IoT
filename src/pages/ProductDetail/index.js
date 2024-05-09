import MainPage from "./components/MainPage";

import { OrganizationContextProvider } from "@/context/Organization";
import { AuthProvider } from "@/context/AuthContext";
import { ProductContextProvider } from "@/context/Product";
export default function Product() {
  return <MainPage></MainPage>;
}
