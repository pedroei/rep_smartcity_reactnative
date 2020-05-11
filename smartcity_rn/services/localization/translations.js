import LocalizedStrings from 'react-native-localization';
export const DEFAULT_LANGUAGE = 'en';

const translations = {
  en: {
    SmartCity: 'SmartCity',
    Email: 'Email',
    Password: 'Password',
    Login: 'Login',
    Registar: 'Sign in',
    notas_pessoais: 'Personal Notes',
    add_nota: 'Add Note',
    edit_nota: 'Edit Note',
    voltar: 'Go back',
    preencher: 'Fill all the fields',
    nota_criada: 'Note created!',
    titulo: 'Title',
    local: 'Place',
    descricao: 'Description',
    info: 'Info',
    nota_editada: 'Note edited!',
    ok: 'OK',
    editar_falhou: 'Editing failure',
    atualizar: 'Update',
    confirmacao_apagar: 'Do you really want to delete this note?',
    sim: 'Yes',
    nao: 'No',
    apagar: 'Delete'
  },

  pt: {
    SmartCity: 'SmartCity',
    Email: 'Email',
    Password: 'Password',
    Login: 'Login',
    Registar: 'Registar',
    notas_pessoais: 'Notas Pessoais',
    add_nota: 'Adicionar Nota',
    edit_nota: 'Editar Nota',
    voltar: 'Voltar',
    preencher: 'Preencha todos so campos!',
    nota_criada: 'Nota criada!',
    titulo: 'Titulo',
    local: 'Local',
    descricao: 'Descrição',
    info: 'Info',
    nota_editada: 'Nota editada!',
    ok: 'Ok',
    editar_falhou: 'Falha na edição!',
    atualizar: 'Atualizar',
    confirmacao_apagar: 'Tem a certeza que pretende apagar esta nota?',
    sim: 'Sim',
    nao: 'Não',
    apagar: 'Apagar'
  }
};

export default new LocalizedStrings(translations);
