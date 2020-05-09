import React, { Component } from 'react';
import { StyleSheet, Platform, View, Button, Image, Text, TextInput, TouchableOpacity, Alert, YellowBox, FlatList } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Realm from 'realm';
let realm;

class AddNota extends Component{

  constructor(props) {
    super(props);
    realm = new Realm({ path: 'notas.realm' });
    var pessoas = realm.objects('nota');

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
          Alert.alert("Registo inserido!")
      }
    }

      back = () =>
    {
       this.props.navigation.navigate('Lista');

    }

    render() {
    return (
     <View style={styles.MainContainer}>
       <TextInput
             placeholder="Inserir titulo"
             style = { styles.TextInputStyle }
             underlineColorAndroid = "transparent"
             onChangeText = { ( text ) => { this.setState({ titulo: text })} }
       />
       <TextInput
             placeholder="Inserir descricao"
             style = { styles.TextInputStyle }
             underlineColorAndroid = "transparent"
             onChangeText = { ( text ) => { this.setState({ descricao: text })} }
       />
       <TextInput
             placeholder="Inserir local"
             style = { styles.TextInputStyle }
             underlineColorAndroid = "transparent"
             onChangeText = { ( text ) => { this.setState({ local: text })} }
       />
       <TouchableOpacity onPress={this.addRegisto} activeOpacity={0.7} style={styles.button} >
          <Text style={styles.TextStyle}> Adicionar </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.back}  activeOpacity={0.7} style={styles.button} >
          <Text style={styles.TextStyle}> Voltar </Text>
        </TouchableOpacity>

     </View>
    );
    }

}


 const styles = StyleSheet.create({
   MainContainer: {
     flex: 1,
   },
   button: {
       height: 40,
       padding: 10,
       backgroundColor: '#4CAF50',
       borderRadius:7,
       margin: 12
   },
   TextInputStyle:
   {
       borderWidth: 1,
       margin: 10,
       borderColor: '#009688',
       height: 40,
       borderRadius: 10,
       marginBottom: 10,
       textAlign: 'center',
   },
 });

 export default AddNota;