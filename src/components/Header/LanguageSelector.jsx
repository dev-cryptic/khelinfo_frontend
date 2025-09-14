import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const selectedLanguage = i18n.language;

  const handleChange = (e) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
    localStorage.setItem("i18nextLng", newLang);
  };

  return (
    <select
      value={selectedLanguage}
      onChange={handleChange}
      className="border px-2 py-1 rounded text-gray-800 text-xs"
    >
      <option value="en">English</option>
      <option value="hi">हिन्दी</option>
      <option value="ta">தமிழ்</option>
      <option value="te">తెలుగు</option>
    </select>
  );
};

export default LanguageSelector;
