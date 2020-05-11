import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Platform, View, Button, Image, Text, TextInput, TouchableOpacity, Alert, YellowBox, FlatList } from 'react-native';

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Realm from 'realm';
let realm ;

function AddNota({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [local, setLocal] = useState('');
  const [data, setData] = useState('');

  function addRegisto(){
      if (titulo.trim() === "" || descricao.trim() === "" || local.trim() === "") {
        Alert.alert("Preencha todo so campos!")
      } else {
        realm = new Realm({ path: 'notas.realm' });

        const lastRecord = realm.objects('nota').sorted('id', true)[0];
        const highestId = lastRecord == null?0:lastRecord.id;
        const newID = highestId == null?1:highestId+1;

        var day = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        
        var date = day + '/' + month + '/' + year;
        //var time =  hours + ':' + min + ':' + sec;

        realm.write(() => {
          realm.create('nota', {
            id: newID,
            titulo: titulo,
            descricao: descricao,
            local: local,
            data: date
            });
        });
        Alert.alert("Nota criada!");
        navigation.navigate('Lista');
      }
  }

  return (
    <View style={styles.MainContainer}>
      <TextInput
            placeholder="Titulo"
            style = { styles.TextInputStyleTitulo }
            underlineColorAndroid = "transparent"
            onChangeText={text => setTitulo(text)}
      />
      <TextInput
            placeholder="Local"
            style = { styles.TextInputStyleLocal }
            underlineColorAndroid = "transparent"
            onChangeText = { text => setLocal(text)}
      />
      <TextInput
            placeholder="Descricao"
            style = { styles.TextInputStyleDesc }
            multiline={true}
            underlineColorAndroid = "transparent"
            onChangeText = { text => setDescricao(text)}
      />

       <View style = { styles.containerBtns }>
        <TouchableOpacity onPress={() => navigation.dispatch(StackActions.popToTop()) }  activeOpacity={0.7} style={styles.button} >
            <Text style={styles.text}> Voltar </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={addRegisto} activeOpacity={0.7} style={styles.button} >
            <Text style={styles.text}> Adicionar </Text>
          </TouchableOpacity>
        </View>

    </View>
  );

}


const styles = StyleSheet.create({
    MainContainer: {
     flex: 1,
     backgroundColor: '#fff',
    },
    containerBtns: {
       flexDirection: 'row',
       marginTop: 30
    },
    button: {
       width: 150,
       padding: 10,
       borderRadius:25,
       margin: 12,
       backgroundColor: 'rgba(72,61,139, 0.8)',
    },
    text: {
      color: 'white',
      fontSize: 16,
      textAlign: 'center'
    },
    TextInputStyleTitulo: {
       borderWidth: 1,
       margin: 10,
       borderColor: '#000',
       height: 40,
       borderRadius: 15,
       marginBottom: 15,
       textAlign: 'left',
       marginLeft: 10,
       marginTop: 20
    },
    TextInputStyleLocal: {
       borderWidth: 1,
       margin: 10,
       borderColor: '#000',
       height: 40,
       borderRadius: 15,
       marginBottom: 15,
       textAlign: 'left',
       marginLeft: 10
    },
    TextInputStyleDesc: {
       height: 250,
       borderWidth: 1,
       margin: 10,
       borderColor: '#000',
       borderRadius: 15,
       marginBottom: 10,
       textAlignVertical: 'top' 
    },
 });

 export default AddNota;