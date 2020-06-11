import React, {useEffect, useState, useContext} from 'react';
import {
  Text,
  View,
  Button,
  Alert,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {LocalizationContext} from './../services/localization/LocalizationContext';

import ImagePicker from 'react-native-image-crop-picker';

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

function AddProblema({route, navigation}) {
  const {id, lat, long} = route.params;

  const [dimensions, setDimensions] = useState({window, screen});
  const {translations} = useContext(LocalizationContext);

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [img, setImg] = useState([]);
  const [imgb64, setImgb64] = useState('');
  const [msg, setMsg] = useState([]);

  const onChange = ({window, screen}) => {
    setDimensions({window, screen});
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  });

  function addProblem() {
    if (titulo.trim() === '' || descricao.trim() === '' || img === '') {
      Alert.alert(translations.preencher);
    } else {
      addProbWS();
    }
  }

  function pickPhoto() {
    //Alert.alert('Tirar foto!');
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      setImg(image);
      setImgb64(image.data);
      //console.log(image);
    });
  }

  function addProbWS() {
    var day = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year

    var imgEnviar = `data:${img.mime};base64,${img.data}`;

    var date = day + '/' + month + '/' + year;
    var estado = 'Ativo';

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        titulo: encrypt(titulo),
        descricao: encrypt(descricao),
        imagem: encrypt(imgEnviar),
        latitude: encrypt(JSON.stringify(lat)),
        longitude: encrypt(JSON.stringify(long)),
        estado: encrypt(estado),
        data: encrypt(date),
        id_utilizador: encrypt(id),
      }),
    };
    fetch(
      'https://pedroacm.000webhostapp.com/cm/cm/index.php/api/problema',
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        setMsg(decrypt(data.MSG));
        if (decrypt(data.status) == 'true') {
          Alert.alert(translations.problemaAdicionado);
          navigation.dispatch(
            StackActions.replace('StackMapa', {
              screen: 'Mapa',
              params: {id: id},
            }),
          );
        } else {
          Alert.alert(translations.addProblemErro + decrypt(data.MSG));
        }
      });
  }

  return (
    <View style={styles.MainContainer}>
      <TextInput
        placeholder={translations.titulo}
        style={styles.TextInputStyleTitulo}
        underlineColorAndroid="transparent"
        onChangeText={(text) => setTitulo(text)}
      />
      <TextInput
        placeholder={translations.descricao}
        style={
          dimensions.window.height > dimensions.window.width
            ? styles.TextInputStyleDesc
            : styles.TextInputStyleDescLand
        }
        multiline={true}
        underlineColorAndroid="transparent"
        onChangeText={(text) => setDescricao(text)}
      />
      <View
        style={
          dimensions.window.height > dimensions.window.width
            ? styles.containerVazio
            : styles.containerLand
        }>
        <View style={styles.containerImg}>
          <Image
            style={
              dimensions.window.height > dimensions.window.width
                ? styles.imagemStyle
                : styles.imagemStyleLand
            }
            source={{uri: `data:${img.mime};base64,${img.data}`}}
          />
        </View>
        <View
          style={
            dimensions.window.height > dimensions.window.width
              ? styles.containerBtns
              : styles.containerBtnsLand
          }>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.button}
            onPress={pickPhoto}>
            <Text style={styles.text}>{translations.tirarFoto}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.button}
            onPress={addProblem}>
            <Text style={styles.text}>{translations.adicionarProblema}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/*<Text>{msg}</Text>
      <Text style={{fontSize: 10, marginTop: 100}}>{id}</Text>
      <Text style={{fontSize: 10}}>{lat}</Text>
      <Text style={{fontSize: 10}}>{long}</Text> */}
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
    justifyContent: 'center',
  },
  containerBtnsLand: {
    marginLeft: 60,
  },
  button: {
    width: 150,
    padding: 10,
    borderRadius: 25,
    margin: 12,
    marginTop: 0,
    backgroundColor: 'rgba(72,61,139, 0.8)',
  },
  text: {
    color: 'white',
    fontSize: 15,
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
    height: 200,
    borderWidth: 1,
    margin: 10,
    borderColor: '#000',
    borderRadius: 15,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  TextInputStyleDescLand: {
    height: 50,
    borderWidth: 1,
    margin: 10,
    borderColor: '#000',
    borderRadius: 15,
    marginBottom: 0,
    textAlignVertical: 'top',
  },
  containerImg: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imagemStyle: {
    width: 200,
    height: 150,
    marginTop: 0,
    marginBottom: 10,
  },
  imagemStyleLand: {
    width: 150,
    height: 110,
  },
  containerVazio: {},
  containerLand: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default AddProblema;
