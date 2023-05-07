import Navbar from "@/components/navbar";
import { useAuthContext } from "@/contexts/AuthContext.js";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
