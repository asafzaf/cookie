import React, { createContext, useState, useMemo } from "react";
import { getTranslation } from "../translations/translations";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LanguageStringContext = createContext();

export const LanguageStringProvider = ({ children }) => {
  const [language, setLanguage] = useState("english");

  useState(() => {
    AsyncStorage.getItem("language").then((lang) => {
      if (lang) {
        setLanguage(lang);
      } else {
        setLanguage("english");
        AsyncStorage.setItem("language", "english");
      }
    });
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    AsyncStorage.setItem("language", lang);
  };

  const translations = useMemo(() => getTranslation(language), [language]);

  return (
    <LanguageStringContext.Provider
      value={{ language, changeLanguage, translations }}
    >
      {children}
    </LanguageStringContext.Provider>
  );
};
