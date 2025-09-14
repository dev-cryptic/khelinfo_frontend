import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import ChatWidget from "./components/ChatRoom/ChatWidget"

function Layout() {
  return (
    <>
      <Header />
      <ChatWidget /> {/* Floating chat bot icon */}
      
      <Outlet />
      <Footer />
    </>
  );
}   

export default Layout;
