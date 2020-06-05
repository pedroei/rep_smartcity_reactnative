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

import Realm from 'realm';
let realm;

function EditarNota({route, navigation}) {
  const {translations} = useContext(LocalizationContext);
  const [dimensions, setDimensions] = useState({window, screen});

  const {id, titulo, descricao, local} = route.params;

  const [titulo1, setTitulo1] = useState(titulo);
  const [descricao1, setDescricao1] = useState(descricao);
  const [local1, setLocal1] = useState(local);

  const onChange = ({window, screen}) => {
    setDimensions({window, screen});
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  });

  function updateNota() {
    if (
      titulo1.trim() === '' ||
      descricao1.trim() === '' ||
      local1.trim() === ''
    ) {
      Alert.alert(translations.preencher);
    } else {
      realm = new Realm({path: 'notas.realm'});

      realm.write(() => {
        var obj = realm.objects('nota').filtered('id =' + id);
        if (obj.length > 0) {
          obj[0].titulo = titulo1;
          obj[0].descricao = descricao1;
          obj[0].local = local1;
          Alert.alert(
            translations.info,
            translations.nota_editada,
            [
              {
                text: translations.ok,
                onPress: () => navigation.dispatch(StackActions.popToTop()),
              },
            ],
            {cancelable: false},
          );
        } else {
          alert(translations.editar_falhou);
        }
      });
    }
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
        placeholder={translations.local}
        style={styles.TextInputStyleLocal}
        underlineColorAndroid="transparent"
        onChangeText={(text) => setLocal1(text)}>
        {local1}
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
          onPress={updateNota}
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
    marginTop: 30,
    justifyContent: 'center',
  },
  containerBtnsLand: {
    flexDirection: 'row',
    marginTop: 0,
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
  TextInputStyleLocal: {
    borderWidth: 1,
    margin: 10,
    borderColor: '#000',
    height: 40,
    borderRadius: 15,
    marginBottom: 15,
    textAlign: 'left',
    marginLeft: 10,
  },
  TextInputStyleDesc: {
    height: 250,
    borderWidth: 1,
    margin: 10,
    borderColor: '#000',
    borderRadius: 15,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  TextInputStyleDescLand: {
    height: 60,
    borderWidth: 1,
    margin: 10,
    borderColor: '#000',
    borderRadius: 15,
    marginBottom: 0,
    textAlignVertical: 'top',
  },
});

export default EditarNota;
