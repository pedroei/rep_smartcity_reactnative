import React, {Component, useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TextInput,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {StackActions} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {LocalizationContext} from './../services/localization/LocalizationContext';
import bg from './../images/backgound.jpg';
import logo from './../images/city.png';
import Icon from 'react-native-vector-icons/MaterialIcons';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

const {width: WIDTH} = Dimensions.get('window');

function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  return (
    <ImageBackground
      source={bg}
      style={
        dimensions.window.height > dimensions.window.width
          ? styles.backgroundContainer
          : styles.backgroundContainerLand
      }>
      <View
        style={
          dimensions.window.height > dimensions.window.width
            ? styles.logoContainer
            : styles.logoContainerLand
        }>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.logoText}>{translations.SmartCity}</Text>
      </View>

      <View>
        <View style={styles.inputContainer}>
          <TextInput
            style={
              dimensions.window.height > dimensions.window.width
                ? styles.input
                : styles.inputLand
            }
            placeholder={translations.Email}
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            underlineColorAndroid="transparent"
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={
              dimensions.window.height > dimensions.window.width
                ? styles.input
                : styles.inputLand
            }
            placeholder={translations.Password}
            secureTextEntry={true}
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            underlineColorAndroid="transparent"
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <View
          style={
            dimensions.window.height > dimensions.window.width
              ? styles.containerbtns
              : styles.containerbtnsLand
          }>
          <View
            style={
              dimensions.window.height > dimensions.window.width
                ? styles.containerLogin
                : styles.containerLoginLand
            }>
            <TouchableOpacity
              style={
                dimensions.window.height > dimensions.window.width
                  ? styles.btnLogin
                  : styles.btnLand
              }
              onPress={() => navigation.dispatch(StackActions.replace('Mapa'))}>
              <Text style={styles.text}>{translations.Login}</Text>
            </TouchableOpacity>
            <Text
              style={
                dimensions.window.height > dimensions.window.width
                  ? styles.textRegistar
                  : styles.textRegistarLand
              }
              onPress={() => navigation.navigate('Registar')}>
              {translations.Registar}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={
                dimensions.window.height > dimensions.window.width
                  ? styles.btnNotas
                  : styles.btnLand
              }
              onPress={() => navigation.navigate('StackLista')}>
              <Text style={styles.text}>{translations.notas_pessoais}</Text>
            </TouchableOpacity>
          </View>
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
    //justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundContainerLand: {
    flex: 1,
    width: null,
    height: null,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 50,
  },
  logoContainerLand: {
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 50,
    marginLeft: 20,
  },
  logo: {
    width: 120,
    height: 120,
  },
  logoText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '500',
    marginTop: 10,
    opacity: 0.5,
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
  inputLand: {
    width: 400,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    //paddingLeft: 45,
    paddingLeft: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    color: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 25,
  },
  inputIcon: {
    position: 'absolute',
    top: 10,
    left: 37,
  },
  btnEye: {
    position: 'absolute',
    top: 8,
    right: 37,
  },
  btnLogin: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    backgroundColor: 'rgba(72,61,139, 0.8)',
    justifyContent: 'center',
    marginTop: 20,
  },

  btnNotas: {
    width: 150,
    height: 45,
    borderRadius: 25,
    backgroundColor: 'rgba(72,61,139, 0.8)',
    justifyContent: 'center',
    marginTop: 60,
  },
  btnLand: {
    width: 150,
    padding: 10,
    borderRadius: 25,
    margin: 12,
    backgroundColor: 'rgba(72,61,139, 0.8)',
    justifyContent: 'center',
  },
  text: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    textAlign: 'center',
  },
  textRegistar: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
    marginTop: 5,
    opacity: 0.9,
  },
  textRegistarLand: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
    opacity: 0.9,
  },
  containerbtns: {
    alignItems: 'center',
  },
  containerbtnsLand: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 25,
  },
  containerLogin: {
    alignItems: 'center',
  },
  containerLoginLand: {
    marginTop: 20,
    marginLeft: 20,
    alignItems: 'center',
  },
});

export default Login;
