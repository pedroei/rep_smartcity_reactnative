
import React, { Component, useState} from 'react';
import { StyleSheet, View, Text, Image, Button, TextInput} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return(
    <View style={styles.full}>
      <View style={styles.part1}>
      <Image
          style={styles.image}
          source={require('../images/react.png')}
        />
      </View>
      <View style={styles.part2}>
        <TextInput
          style={styles.textinput}
          placeholder="Email"
          placeholderTextColor="white"
          onChangeText={text => setEmail(text)}
          defaultValue={email}
        />
        <TextInput
          style={styles.textinput}
          placeholder="Password"
          placeholderTextColor="white"
          onChangeText={text => setPassword(text)}
          defaultValue={password}
        />
        <View style={styles.buttonview}>
          <Button
            onPress={() => {
                alert('Email: ' + email + '\nPassword: ' + password);
            }}
            color="#780647"
            title="Ver Dados"
          />
        </View>

        <Text style={styles.textinput2}>
        {'Email: ' + email + '\nPassword: ' + password}
        </Text>
        
      </View>
      <View style={styles.part3}>
          <Button
            color="#780623"
            title="Notas Pessoais"
            onPress={() => navigation.navigate('Lista', {numero: '123'}) }
          />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    full: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#222222'
    },
    part1: {
      flex: 1,
  //    backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    part2: {
      flex: 2,
      
    //  backgroundColor: 'blue',
    },
    part3: {
      flex: 1,
    //  backgroundColor: 'red',
      justifyContent: 'flex-end',
      margin: 10,
    },
    buttonview: {
      flex: 1,
      margin: 10,
    },
    text: {
      color: 'white',
      fontSize: 25,
    },
    textinput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      margin: 10,
      color: 'white',
      
    },
    textinput2: {
      height: 40,
      margin: 10,
      color: 'white',
    },
    image: {
      flex: 1,
      width: 150,
      height: 150,
      
  },
});

export default Login;

