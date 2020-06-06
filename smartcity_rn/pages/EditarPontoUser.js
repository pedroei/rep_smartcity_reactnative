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

function EditarPontoUser({route, navigation}) {
  const {translations} = useContext(LocalizationContext);
  const [dimensions, setDimensions] = useState({window, screen});

  const {id_utilizador, titulo, descricao, estado} = route.params;

  const [titulo1, setTitulo1] = useState(titulo);
  const [descricao1, setDescricao1] = useState(descricao);
  const [estado1, setEstado1] = useState(estado);

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
      Alert.alert('Preencha todos os campos');
    } else {
      Alert.alert('Editar!');
      /*navigation.dispatch(
        StackActions.replace('ListaPontosUser', {id: id_utilizador}),
      );*/
    }
  }

  return (
    <View style={styles.MainContainer}>
      <TextInput
        placeholder="Titulo"
        style={styles.TextInputStyleTitulo}
        underlineColorAndroid="transparent"
        onChangeText={(text) => setTitulo1(text)}>
        {titulo1}
      </TextInput>
      <TextInput
        placeholder="Descricao"
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
