import React, {Component, useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Platform,
  View,
  Button,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  YellowBox,
  ListView,
  Dimensions,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StackActions} from '@react-navigation/native';

import {LocalizationContext} from './../services/localization/LocalizationContext';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

function decrypt(text) {
  const crypto = require('./../services/encriptacao/crypto');
  const ENCRYPTION_KEY = 'cece3a7dc9cf86aae926fd2ee520a06e'; // Must be 256 bits (32 characters)
  const IV_LENGTH = 'cece3a7dc9cf86aa'; // For AES, this is always 16
  let decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    ENCRYPTION_KEY,
    IV_LENGTH,
  );
  let decrypted = decipher.update(text, 'base64', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

function encrypt(text) {
  const crypto = require('./../services/encriptacao/crypto');
  const ENCRYPTION_KEY = 'cece3a7dc9cf86aae926fd2ee520a06e'; // Must be 256 bits (32 characters)
  const IV_LENGTH = 'cece3a7dc9cf86aa'; // For AES, this is always 16
  let cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, IV_LENGTH);
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');

  return encrypted;
}

function EditarPontoUser({route, navigation}) {
  const {translations} = useContext(LocalizationContext);
  const [dimensions, setDimensions] = useState({window, screen});

  const {id, id_utilizador, titulo, descricao, estado} = route.params;

  const [titulo1, setTitulo1] = useState(decrypt(titulo));
  const [descricao1, setDescricao1] = useState(decrypt(descricao));
  const [estado1, setEstado1] = useState(decrypt(estado));

  const onChange = ({window, screen}) => {
    setDimensions({window, screen});
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  });

  function updatePonto() {
    if (titulo1.trim() === '' || descricao1.trim() === '') {
      Alert.alert(translations.preencher);
    } else {
      editarPonto();
      /*
      );*/
    }
  }

  function editarPonto() {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: encrypt(decrypt(id)),
        titulo: encrypt(titulo1),
        descricao: encrypt(descricao1),
      }),
    };
    fetch(
      'https://pedroacm.000webhostapp.com/cm/cm/index.php/api/editarP',
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        if (decrypt(data.status) == 'true') {
          Alert.alert(translations.editProblema);
          navigation.dispatch(
            StackActions.replace('ListaPontosUser', {
              id: decrypt(id_utilizador),
            }),
          );
        } else {
          Alert.alert(translations.editProblemaErro + decrypt(data.msg));
        }
      });
  }

  return (
    <View style={styles.MainContainer}>
      <TextInput
        placeholder={translations.titulo}
        style={styles.TextInputStyleTitulo}
        underlineColorAndroid="transparent"
        onChangeText={(text) => setTitulo1(text)}>
        {titulo1}
      </TextInput>
      <TextInput
        placeholder={translations.descricao}
        style={
          dimensions.window.height > dimensions.window.width
            ? styles.TextInputStyleDesc
            : styles.TextInputStyleDescLand
        }
        multiline={true}
        underlineColorAndroid="transparent"
        onChangeText={(text) => setDescricao1(text)}>
        {descricao1}
      </TextInput>

      <View
        style={
          dimensions.window.height > dimensions.window.width
            ? styles.containerBtns
            : styles.containerBtnsLand
        }>
        <TouchableOpacity
          onPress={() => navigation.dispatch(StackActions.popToTop())}
          activeOpacity={0.7}
          style={styles.button}>
          <Text style={styles.text}>{translations.voltar}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={updatePonto}
          activeOpacity={0.7}
          style={styles.button}>
          <Text style={styles.text}>{translations.atualizar}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerBtns: {
    flexDirection: 'row',
    margin: 12,
    marginTop: 40,
    justifyContent: 'center',
  },
  containerBtnsLand: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'center',
  },
  button: {
    width: 150,
    padding: 10,
    borderRadius: 25,
    margin: 12,
    backgroundColor: 'rgba(72,61,139, 0.8)',
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  TextInputStyleTitulo: {
    borderWidth: 1,
    margin: 10,
    borderColor: '#000',
    height: 40,
    borderRadius: 15,
    marginBottom: 15,
    textAlign: 'left',
    marginLeft: 10,
    marginTop: 20,
  },
  TextInputStyleDesc: {
    height: 300,
    borderWidth: 1,
    margin: 10,
    borderColor: '#000',
    borderRadius: 15,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  TextInputStyleDescLand: {
    height: 110,
    borderWidth: 1,
    margin: 10,
    borderColor: '#000',
    borderRadius: 15,
    marginBottom: 0,
    textAlignVertical: 'top',
  },
});

export default EditarPontoUser;
