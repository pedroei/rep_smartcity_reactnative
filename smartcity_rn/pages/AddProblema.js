import React, {useEffect, useState} from 'react';
import {Text, View, Button, Alert, TextInput, Image} from 'react-native';
import {StackActions} from '@react-navigation/native';

import ImagePicker from 'react-native-image-crop-picker';

function AddProblema({route, navigation}) {
  const {id, lat, long} = route.params;

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [img, setImg] = useState([]);
  const [imgb64, setImgb64] = useState('');
  const [msg, setMsg] = useState([]);

  function addProblem() {
    if (titulo.trim() === '' || descricao.trim() === '' || img === '') {
      Alert.alert('Preencha todos os campos!');
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
        titulo: titulo,
        descricao: descricao,
        imagem: img,
        latitude: lat,
        longitude: long,
        estado: estado,
        data: date,
        id_utilizador: id,
      }),
    };
    fetch(
      'https://pedroacm.000webhostapp.com/cm/cm/index.php/api/problema',
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        setMsg(data.MSG);
        if (data.status === true) {
          Alert.alert('Problema Adicionado!');
          navigation.dispatch(StackActions.replace('Mapa', {id: data.id}));
        } else {
          Alert.alert('Erro ao adicionar! ' + data.MSG);
        }
      });

    /*
    console.log(
      titulo +
        ' ' +
        descricao +
        ' ' +
        imgEnviar +
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
    );*/
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
      <Image
        style={{
          width: 200,
          height: 200,
          borderWidth: 1,
          borderColor: 'red',
        }}
        source={{uri: `data:${img.mime};base64,${img.data}`}}
      />
      <Text>{msg}</Text>

      <Text style={{fontSize: 10, marginTop: 100}}>{id}</Text>
      <Text style={{fontSize: 10}}>{lat}</Text>
      <Text style={{fontSize: 10}}>{long}</Text>
    </View>
  );
}

export default AddProblema;
