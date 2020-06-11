import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {StackActions} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {LocalizationContext} from './../services/localization/LocalizationContext';
import bg from './../images/backgound.jpg';
import Icon from 'react-native-vector-icons/MaterialIcons';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');
const {width: WIDTH} = Dimensions.get('window');

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

function Registar({navigation}) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [msg, setMsg] = useState('');

  const {translations} = useContext(LocalizationContext);
  const [dimensions, setDimensions] = useState({window, screen});

  const onChange = ({window, screen}) => {
    setDimensions({window, screen});
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  });

  function registar() {
    if (
      nome.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      confPassword.trim() === ''
    ) {
      Alert.alert(translations.preencher);
    } else {
      if (password !== confPassword) {
        Alert.alert(translations.passwordsIguais);
      } else {
        //Alert.alert('Tudo preenchido e password correta!');
        registarUser();
      }
    }
  }

  function registarUser() {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        nome: encrypt(nome),
        email: encrypt(email),
        password: encrypt(password),
      }),
    };
    fetch(
      'https://pedroacm.000webhostapp.com/cm/cm/index.php/api/registar',
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        setMsg(decrypt(data.MSG));
        if (decrypt(data.MSG) === 'success') {
          Alert.alert(translations.registado);
          navigation.navigate('Login');
        } else {
          Alert.alert(decrypt(data.MSG));
        }
      });
  }

  return (
    <ImageBackground source={bg} style={styles.backgroundContainer}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>{translations.Registar}</Text>
      </View>

      <View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={translations.nome}
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            underlineColorAndroid="transparent"
            onChangeText={(text) => setNome(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={translations.Email}
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            underlineColorAndroid="transparent"
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={translations.Password}
            secureTextEntry={true}
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            underlineColorAndroid="transparent"
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={translations.confPassword}
            secureTextEntry={true}
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            underlineColorAndroid="transparent"
            onChangeText={(text) => setConfPassword(text)}
          />
        </View>

        <View
          style={
            dimensions.window.height > dimensions.window.width
              ? styles.containerBtns
              : styles.containerBtnsLand
          }>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.text}>{translations.voltar}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={registar}>
            <Text style={styles.text}>{translations.Registar}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 50,
  },

  logoText: {
    color: 'white',
    fontSize: 40,
    fontWeight: '500',
    marginTop: 10,
    opacity: 0.7,
  },
  inputContainer: {
    marginTop: 10,
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    //paddingLeft: 45,
    paddingLeft: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    color: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 25,
  },

  btn: {
    width: 150,
    padding: 10,
    borderRadius: 25,
    margin: 12,
    backgroundColor: 'rgba(72,61,139, 0.8)',
  },

  text: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    textAlign: 'center',
  },

  containerBtns: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 80,
  },
});

export default Registar;
