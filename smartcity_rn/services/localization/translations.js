import LocalizedStrings from 'react-native-localization';
export const DEFAULT_LANGUAGE = 'en';

const translations = {
  en: {
    SmartCity: 'SmartCity',
    Email: 'Email',
    Password: 'Password',
    Login: 'Login',
    Registar: 'Sign in',
    notas_pessoais: 'Personal Notes'
  },
  pt: {
    SmartCity: 'SmartCity',
    Email: 'Email',
    Password: 'Password',
    Login: 'Login',
    Registar: 'Registar',
    notas_pessoais: 'Notas Pessoais'
  }
};

export default new LocalizedStrings(translations);
