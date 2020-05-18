import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

function Mapa({navigation}) {
  const [nome, setNome] = useState([]);
  const [email, setEmail] = useState([]);
  const [password, setpassword] = useState([]);
  const [msg, setMsg] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({nome: 'oo', email: 'oo', password: 'oo'}),
    };

    fetch(
      'https://pedroacm.000webhostapp.com/cm/cm/index.php/api/registar',
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        setMsg(data.MSG);
      });
  }, []);

  return (
    <View style={{flex: 1, padding: 24}}>
      <Text>{msg}</Text>
    </View>
  );
}

export default Mapa;
