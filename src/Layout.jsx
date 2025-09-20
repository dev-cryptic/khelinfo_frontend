import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import ChatWidget from "./components/ChatRoom/ChatWidget"
import { Analytics } from "@vercel/analytics/next"

function Layout() {
  return (
    <>
      <Header />
      <ChatWidget /> {/* Floating chat bot icon */}
      <Analytics />
      <Outlet />
      <Footer />
    </>
  );
}   

export default Layout;
