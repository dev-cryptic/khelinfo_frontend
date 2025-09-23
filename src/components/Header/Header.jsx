import { Link } from "react-router-dom";
import Chatbot from "../Chatbot/Chatbot"; // ✅ import chatbot
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";

function Header() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false); // 👈 chatbot state
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [showCricketDropdown, setShowCricketDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDate(
        now.toLocaleDateString("en-IN", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      );
      setCurrentTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        })
      );
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowCricketDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Language and Date Bar */}
      <div className="bg-gray-100 border-b border-gray-300 text-xs text-gray-800 py-1">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <LanguageSelector />
          <div className="text-right">
            <span>{currentDate}</span> | <span>{t("updated")} {currentTime} IST</span>
          </div>
        </div>
      </div>

      {/* Header Main */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center w-full justify-between">
            {/* Left - Hamburger */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
              <Menu className="w-6 h-6 text-gray-700" />
            </button>

            {/* Logo */}
            <Link to="/home" className="flex items-center gap-2">
              <img src="/KHELiNFOlogo.png" alt="KHELiNFO" className="h-6" />
            </Link>

            {/* User / Chatbot button */}
            <button
              className="hover:text-[#012666]"
              onClick={() => setIsChatbotOpen(true)} // ✅ open chatbot
            >
              <img src="/user.png" alt="Login" className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex justify-center space-x-8 text-sm font-medium py-2 border-t border-gray-100">
          <Link to="/home" className="hover:text-[#012666]">{t("home")}</Link>

          <div className="relative group" ref={dropdownRef}>
            <button
              onClick={() => setShowCricketDropdown(!showCricketDropdown)}
              className="inline-flex items-center gap-1 hover:text-[#012666]">
              {t("cricket")}
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  showCricketDropdown ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            {showCricketDropdown && (
              <div className="absolute top-7 left-0 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-40">
                {["news", "fixtures", "teams", "rankings"].map((item) => {
                  const path =
                    item === "rankings"
                      ? "/rankings"
                      : item === "fixtures"
                      ? "/fixtures"
                      : item === "news"
                      ? "/news"
                      : item === "teams"
                      ? "/teams"
                      : `/cricket/${item}`;

                  return (
                    <Link
                      key={item}
                      to={path}
                      onClick={() => setShowCricketDropdown(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      {t(item)}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <Link to="/football" className="hover:text-[#012666]">{t("football")}</Link>
          {/* <Link to="/kabaddi" className="hover:text-[#012666]">{t("kabaddi")}</Link> */}
        </div>

        {/* Mobile Sidebar */}
        {mobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black opacity-30 z-40"
              onClick={() => setMobileMenuOpen(false)}
            ></div>
            <div className="fixed top-0 left-0 w-[200px] h-full bg-white z-50 p-4 shadow-lg">
              <div className="flex justify-end">
                <button onClick={() => setMobileMenuOpen(false)} className="text-gray-600">
                  <X />
                </button>
              </div>
              <Link to="/home" className="block py-2 text-sm text-gray-700 hover:text-[#012666]">{t("home")}</Link>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer py-2 text-sm text-gray-700 hover:text-[#012666]">
                  {t("cricket")}
                  <ChevronDown className="w-3 h-3 group-open:rotate-180 transition duration-200" />
                </summary>
                <div className="pl-3 space-y-1">
                  {["news", "fixtures", "teams", "rankings"].map((item) => {
                    const path =
                      item === "rankings"
                        ? "/rankings"
                        : item === "fixtures"
                        ? "/fixtures"
                        : item === "news"
                        ? "/news"
                        : item === "teams"
                        ? "/teams"
                        : `/${item}`;

                    return (
                      <Link
                        key={item}
                        to={path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1 text-sm text-gray-700 hover:text-[#012666]">
                        {t(item)}
                      </Link>
                    );
                  })}
                </div>
              </details>
              <Link to="/football" className="block py-2 text-sm text-gray-700 hover:text-[#012666]">{t("football")}</Link>
              {/* <Link to="/kabaddi" className="block py-2 text-sm text-gray-700 hover:text-[#012666]">{t("kabaddi")}</Link> */}
            </div>
          </>
        )}
      </header>

      {/* ✅ Chatbot Render */}
      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </>
  );
}

export default Header;
