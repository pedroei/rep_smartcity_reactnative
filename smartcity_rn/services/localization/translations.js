import LocalizedStrings from 'react-native-localization';
export const DEFAULT_LANGUAGE = 'en';

const translations = {
  en: {
    WELCOME: 'Welcome to Localization',
    BUTTON: 'b en'
  },
  pt: {
    WELCOME: 'Bem-vindo à multi-lingua',
    BUTTON: 'b pt'
  }
};

export default new LocalizedStrings(translations);
