import React, {useEffect, useState} from 'react';
import {Text, View, Button, Alert, TextInput, Image} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

function AddProblema({route, navigation}) {
  const {id, lat, long} = route.params;

  const [titulo, setTitulo] = useState([]);
  const [descricao, setDescricao] = useState([]);
  //const [imagem, setImagem] = useState('');
  const [msg, setMsg] = useState([]);
  const [img, setImg] = useState([]);

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
    //Alert.alert('Tirar foto!');
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      setImg(image);
      console.log(image);
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
