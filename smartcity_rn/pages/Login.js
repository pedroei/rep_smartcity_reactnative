
import React, { Component, useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image, Button, TextInput, ImageBackground, Dimensions, TouchableOpacity} from 'react-native';

import {StackActions} from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import bg from './../images/backgound.jpg';
import logo from './../images/city.png';
import Icon from 'react-native-vector-icons/MaterialIcons';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const { width: WIDTH } = Dimensions.get('window');

function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [dimensions, setDimensions] = useState({ window, screen });

     const onChange = ({ window, screen }) => {
       setDimensions({ window, screen });
     };

     useEffect(() => {
       Dimensions.addEventListener("change", onChange);
       return () => {
         Dimensions.removeEventListener("change", onChange);
       };
     });

  return(
    <ImageBackground source={bg} style={styles.backgroundContainer}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo}/>
        <Text style={styles.logoText}>SmartCity</Text>
      </View>

      <View style={styles.inputContainer}>
   
        <TextInput 
          style={styles.input}
          placeholder={'Email'}
          placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
          underlineColorAndroid='transparent'
          onChangeText={text => setEmail(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input}
          placeholder={'Password'}
          secureTextEntry={true}
          placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
          underlineColorAndroid='transparent'
          onChangeText={text => setPassword(text)}
        />
      </View>

      <TouchableOpacity 
        style={styles.btnLogin}
        onPress={() => navigation.dispatch(StackActions.replace('Mapa'))}>
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.textRegistar}>Registar</Text>

      <TouchableOpacity 
        style={styles.btnNotas}
        onPress={() => navigation.navigate('StackLista') }>
        <Text style={styles.text}>Notas pessoais</Text>
      </TouchableOpacity>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        //justifyContent: 'center',
        alignItems: 'center'
    },
    logoContainer: {
      alignItems: 'center',
      marginTop: 35,
      marginBottom: 50
    },
    logo: {
      width: 120,
      height: 120
    },
    logoText: {
      color: 'white',
      fontSize: 25,
      fontWeight: '500',
      marginTop: 10,
      opacity: 0.5
    },
    inputContainer: {
      marginTop: 10,
    },
    input: {
      width: WIDTH-55,
      height: 45,
      borderRadius: 25,
      fontSize: 16,
      //paddingLeft: 45,
      paddingLeft: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.35)',
      color: 'rgba(255, 255, 255, 0.7)',
      marginHorizontal: 25
    },
    inputIcon: {
      position: 'absolute',
      top: 10,
      left: 37
    },
    btnEye: {
      position: 'absolute',
      top: 8,
      right: 37
    },
    btnLogin: {
      width: WIDTH-55,
      height: 45,
      borderRadius: 25,
      backgroundColor: 'rgba(72,61,139, 0.8)',
      justifyContent: 'center',
      marginTop: 20
    },
    btnNotas: {
      width: 150,
      height: 45,
      borderRadius: 25,
      backgroundColor: 'rgba(72,61,139, 0.8)',
      justifyContent: 'center',
      marginTop: 50
    },
    text: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: 16,
      textAlign: 'center'
    },
    textRegistar: {
      color: 'white',
      fontSize: 15,
      fontWeight: '500',
      marginTop: 5,
      opacity: 0.65
    },
});

export default Login;

