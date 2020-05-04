
import React, { Component} from 'react';
import { StyleSheet, Platform, View, Button, Image, Text, TextInput, TouchableOpacity, Alert, YellowBox, ListView, FlatList } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Realm from 'realm';
let realm ;

const Stack = createStackNavigator();

class Lista extends Component{
    constructor() {
        
        super();

        realm = new Realm({
            path: 'notas.realm',
            schema: [{
                name: 'nota',
                properties:
                {
                    id: {type: 'int',   default: 0},
                    titulo: 'string',
                    descricao: 'string',
                    local: 'string',
                }
            }]
        });

        var notas = realm.objects('nota');
        this.state = {
            FlatListItems: notas,
        };

        ListViewItemSeparator = () => {
            return (
            <View style={{ height: 0.5, width: '100%', backgroundColor: '#000' }} />
            );
        };

    }

      GoToAddNota = () =>
    {
       this.props.navigation.navigate('AddNota');

    }


    render() {
        return(
          <View style = { styles.MainContainer }>
          <FlatList
                data={this.state.FlatListItems}
                ItemSeparatorComponent={this.ListViewItemSeparator}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={{ backgroundColor: 'white', padding: 20 }}>
                        <Text>Id: {item.id}</Text>
                        <Text>Titulo: {item.titulo}</Text>
                        <Text>Descrição: {item.descricao}</Text>
                        <Text>Local: {item.local}</Text>
                    </View>
                 )}
            />
            <Button
                color="#780623"
                title="Adicionar Nota"
                onPress={this.GoToAddNota} 
             />
            </View>
        );

    }
}

const styles = StyleSheet.create({
  MainContainer :{
     flex:1,
     justifyContent: 'center',
     paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
     margin: 10
  },
  TextInputStyle:
   {
     borderWidth: 1,
     borderColor: '#009688',
     width: '100%',
     height: 40,
     borderRadius: 10,
     marginBottom: 10,
     textAlign: 'center',
   },
   button: {
     width: '100%',
     height: 40,
     padding: 10,
     backgroundColor: '#4CAF50',
     borderRadius:7,
     marginTop: 12
   },
   TextStyle:{
     color:'#fff',
     textAlign:'center',
   },
   textViewContainer: {
     textAlignVertical:'center',
     padding:10,
     fontSize: 20,
     color: '#000',
    }
 });




export default Lista;