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
    notas_pessoais: 'Notas Pessoais',
    Apagar: 'Apagar',
    add_nota: 'Adicionar Nota',
    edit_nota: 'Editar Nota',
    info: 'Info'
  }
};

export default new LocalizedStrings(translations);
