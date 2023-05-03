import Navbar from "@/components/navbar";
import { useAuthContext } from "@/contexts/AuthContext.js";

export default function Layout({ children }) {
  const { user, _, authz, __ } = useAuthContext();
  console.log("Layout");
  console.log(user);
  console.log(authz);
  console.log("--------")

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
