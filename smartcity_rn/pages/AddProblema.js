import React, {useEffect, useState} from 'react';
import {Text, View, Button, Alert, TextInput} from 'react-native';

function AddProblema({route, navigation}) {
  const {id, lat, long} = route.params;

  const [titulo, setTitulo] = useState([]);
  const [descricao, setDescricao] = useState([]);
  const [imagem, setImagem] = useState([]);
  const [msg, setMsg] = useState([]);

  function addProblem() {
    var day = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    //var hours = new Date().getHours(); //Current Hours
    //var min = new Date().getMinutes(); //Current Minutes
    //var sec = new Date().getSeconds(); //Current Seconds

    var data = day + '/' + month + '/' + year;
    var estado = 'Ativo';
    console.log(
      titulo +
        ' ' +
        descricao +
        ' ' +
        imagem +
        ' ' +
        lat +
        ' ' +
        long +
        ' ' +
        id +
        ' ' +
        data +
        ' ' +
        estado,
    );
  }

  function pickPhoto() {
    Alert.alert('Tirar foto!');
  }

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
      <TextInput
        placeholder="Titulo"
        onChangeText={(text) => setTitulo(text)}
      />
      <TextInput
        placeholder="Descricao"
        onChangeText={(text) => setDescricao(text)}
      />
      <Button title="Tirar Foto" onPress={pickPhoto}></Button>
      <Button title="Adicionar problema" onPress={addProblem}></Button>
      <Text>{msg}</Text>

      <Text style={{fontSize: 10, marginTop: 100}}>{id}</Text>
      <Text style={{fontSize: 10}}>{lat}</Text>
      <Text style={{fontSize: 10}}>{long}</Text>
    </View>
  );
}

export default AddProblema;
