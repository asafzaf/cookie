import React, { createContext, useState, useMemo } from 'react';
import { getTranslation } from '../translations/translations';

export const LanguageStringContext = createContext();

export const LanguageStringProvider = ({ children }) => {
  const [language, setLanguage] = useState('hebrew');

  const changeLanguage = (lang) => setLanguage(lang);

  const translations = useMemo(() => getTranslation(language), [language]);

  return (
    <LanguageStringContext.Provider value={{ language, changeLanguage, translations }}>
      {children}
    </LanguageStringContext.Provider>
  );
};
