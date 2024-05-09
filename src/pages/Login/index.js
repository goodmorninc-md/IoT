import { AuthProvider } from "@/context/AuthContext";
import Login from "./login";
export default function MyLogin() {
  return (
    <AuthProvider>
      <Login></Login>
    </AuthProvider>
    //
  );
}
