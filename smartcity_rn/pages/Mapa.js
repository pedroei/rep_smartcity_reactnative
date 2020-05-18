import React, {useEffect, useState} from 'react';
import {Text, View, Button, Alert, TextInput} from 'react-native';

function Mapa({navigation}) {
  const [nome, setNome] = useState([]);
  const [email, setEmail] = useState([]);
  const [password, setpassword] = useState([]);
  const [msg, setMsg] = useState([]);

  function registar() {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({nome: nome, email: email, password: password}),
    };
    fetch(
      'https://pedroacm.000webhostapp.com/cm/cm/index.php/api/registar',
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        setMsg(data.MSG);
        if (data.MSG === 'success') {
          Alert.alert('Registado!');
        } else {
          Alert.alert(data.MSG);
        }
      });
  }

  return (
    <View style={{flex: 1, padding: 24}}>
      <TextInput placeholder="Nome" onChangeText={(text) => setNome(text)} />
      <TextInput placeholder="Email" onChangeText={(text) => setEmail(text)} />
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setpassword(text)}
      />
      <Button title="registar" onPress={registar}></Button>
      <Text>{msg}</Text>
    </View>
  );
}

export default Mapa;
