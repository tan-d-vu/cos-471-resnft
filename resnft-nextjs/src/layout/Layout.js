import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen" id="site">
      <Navbar />
      <div className="flex flex-1" id="main">{children}</div>
      <Footer />
    </div>
  );
}
