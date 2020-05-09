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

  updateNota=()=>{
    if (this.state.titulo.trim() === "" || this.state.descricao.trim() === "" || this.state.local.trim() === "") {
      Alert.alert("Preencha todo so campos!")
    } else {
          realm.write(() => {
            var obj = realm.objects('nota').filtered('id =' + this.state.id);
            if (obj.length > 0) {
              obj[0].titulo = this.state.titulo;
              obj[0].descricao = this.state.descricao;
              obj[0].local = this.state.local;
                Alert.alert(
                  'Info',
                  'Registo atualizado com sucesso',
                  [{
                      text: 'Ok',
                      onPress: () =>
                        this.props.navigation.navigate('Lista'),
                    },],
                  { cancelable: false }
                );
            } else {
              alert('Atualização falhou');
            }
          });
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
             value={this.state.titulo}
             onChangeText = { ( text ) => { this.setState({ titulo: text })} }
       />
       <TextInput
             placeholder="Local"
             style = { styles.TextInputStyleLocal }
             underlineColorAndroid = "transparent"
             value={this.state.local}
             onChangeText = { ( text ) => { this.setState({ local: text })} }
       />
       <TextInput
             placeholder="Descricao"
             style = { styles.TextInputStyleDesc }
             multiline={true}
             underlineColorAndroid = "transparent"
             value={this.state.descricao}
             onChangeText = { ( text ) => { this.setState({ descricao: text })} }
       />
       <View style = { styles.containerBtns }>
          <TouchableOpacity onPress={this.back}  activeOpacity={0.7} style={styles.button} >
              <Text style={styles.text}> Voltar </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.updateNota} activeOpacity={0.7} style={styles.button} >
            <Text style={styles.text}> Atualizar </Text>
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

 export default EditarNota;
