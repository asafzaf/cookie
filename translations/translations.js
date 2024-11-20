import english from './english.json';
import hebrew from './hebrew.json';

const translations = {
  english,
  hebrew,
};

export const getTranslation = (language) => {
  return translations[language] || translations.english; // Default to English if language not found
};