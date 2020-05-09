import React, { Component } from 'react';
import { StyleSheet, Platform, View, Button, Image, Text, TextInput, TouchableOpacity, Alert, YellowBox, ListView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StackActions } from '@react-navigation/native';

import Realm from 'realm';
let realm ;

const Stack = createStackNavigator();

class EditarNota extends Component{

  constructor(props){
    super(props);
    this.state = {
      titulo : this.props.route.params.titulo,
      descricao : this.props.route.params.descricao,
      local : this.props.route.params.local,
      id: this.props.route.params.id,
    }
    realm = new Realm({ path: 'notas.realm' });
  }

  updateRegisto=()=>{
    var that = this;
    if (this.state.titulo) {
      if (this.state.descricao) {
        if (this.state.local) {
          realm.write(() => {
            var obj = realm
              .objects('nota')
              .filtered('id =' + this.state.id);
            if (obj.length > 0) {
              obj[0].titulo = this.state.titulo;
              obj[0].descricao = this.state.descricao;
              obj[0].local = this.state.local;
              Alert.alert(
                'Info',
                'Registo atualizado com sucesso',
                [
                  {
                    text: 'Ok',
                    onPress: () =>
                      this.props.navigation.navigate('Lista'),
                  },
                ],
                { cancelable: false }
              );
            } else {
              alert('Atualização falhou');
            }
          });
        } else {
          alert('Preencha o titulo');
        }
      } else {
        alert('Preencha a descricao');
      }
    } else {
      alert('Preencha o local');
    }
  }

  render() {

   return (
     <View style={styles.MainContainer}>
      <TextInput
             placeholder="Inserir Titulo"
             style = { styles.TextInputStyle }
             underlineColorAndroid = "transparent"
             value={this.state.titulo}
             onChangeText = { ( text ) => { this.setState({ titulo: text })} }
       />
       <TextInput
             placeholder="Inserir Descricao"
             style = { styles.TextInputStyle }
             underlineColorAndroid = "transparent"
             value={this.state.descricao}
             onChangeText = { ( text ) => { this.setState({ descricao: text })} }
       />
       <TextInput
             placeholder="Inserir Local"
             style = { styles.TextInputStyle }
             underlineColorAndroid = "transparent"
             value={this.state.local}
             onChangeText = { ( text ) => { this.setState({ local: text })} }
       />
       <TouchableOpacity onPress={this.updateRegisto} activeOpacity={0.7} style={styles.button} >
          <Text style={styles.TextStyle}> Atualizar </Text>
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

 export default EditarNota;
