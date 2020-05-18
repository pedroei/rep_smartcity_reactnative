import React, {useEffect, useState} from 'react';
import {Text, View, Button, Alert, TextInput} from 'react-native';

function Mapa({navigation}) {
  const [email, setEmail] = useState([]);
  const [password, setpassword] = useState([]);
  const [msg, setMsg] = useState([]);
  const [idUser, setIdUser] = useState([]);

  function login() {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: email, password: password}),
    };
    fetch(
      'https://pedroacm.000webhostapp.com/cm/cm/index.php/api/login',
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        setMsg(data.msg);
        setIdUser(data.id);
        if (data.msg === 'success') {
          Alert.alert('Login!' + data.id);
        } else {
          Alert.alert('Email ou Password errados!' + data.id);
        }
      });
  }

  return (
    <View style={{flex: 1, padding: 24}}>
      <TextInput placeholder="Email" onChangeText={(text) => setEmail(text)} />
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setpassword(text)}
      />
      <Button title="login" onPress={login}></Button>
      <Text>{msg}</Text>
    </View>
  );
}

export default Mapa;
