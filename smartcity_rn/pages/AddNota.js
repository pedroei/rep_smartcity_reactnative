import React, { Component } from 'react';
import { StyleSheet, Platform, View, Button, Image, Text, TextInput, TouchableOpacity, Alert, YellowBox, FlatList } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StackActions } from '@react-navigation/native';

import Realm from 'realm';
let realm;

class AddNota extends Component{

  constructor(props) {
    super(props);
    realm = new Realm({ path: 'notas.realm' });
    var notas = realm.objects('nota');

    this.state = {
        titulo: '',
        descricao: '',
        local: '',
        data: '',
    };

  }
    addRegisto=()=>{
      if (this.state.titulo.trim() === "" || this.state.descricao.trim() === "" || this.state.local.trim() === "") {
        Alert.alert("Preencha todo so campos!")
      } else {
        realm.write(() => {
          //var ID = realm.objects('nota').length + 1;
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

          realm.create('nota', {
              id: newID,
              titulo: this.state.titulo,
              descricao: this.state.descricao,
              local: this.state.local,
              data: date,
              });
          });
          Alert.alert("Registo inserido!");
          this.props.navigation.navigate('Lista');

      }
    }

      back = () =>{ this.props.navigation.navigate('Lista'); }

    render() {
    return (
     <View style={styles.MainContainer}>
       <TextInput
             placeholder="Titulo"
             style = { styles.TextInputStyleTitulo }
             underlineColorAndroid = "transparent"
             onChangeText = { ( text ) => { this.setState({ titulo: text })} }
       />
       <TextInput
             placeholder="Local"
             style = { styles.TextInputStyleLocal }
             underlineColorAndroid = "transparent"
             onChangeText = { ( text ) => { this.setState({ local: text })} }
       />
       <TextInput
             placeholder="Descricao"
             style = { styles.TextInputStyleDesc }
             multiline={true}
             underlineColorAndroid = "transparent"
             onChangeText = { ( text ) => { this.setState({ descricao: text })} }
       />
       <View style = { styles.containerBtns }>
        <TouchableOpacity onPress={this.back}  activeOpacity={0.7} style={styles.button} >
            <Text style={styles.text}> Voltar </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.addRegisto} activeOpacity={0.7} style={styles.button} >
            <Text style={styles.text}> Adicionar </Text>
          </TouchableOpacity>
        </View>

     </View>
    );
    }

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