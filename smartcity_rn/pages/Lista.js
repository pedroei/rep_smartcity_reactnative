
import React, { Component} from 'react';
import { StyleSheet, Platform, View, Button, Image, Text, TextInput, TouchableOpacity, Alert, YellowBox, ListView, FlatList, TouchableWithoutFeedback } from 'react-native';

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
                    data: 'string'
                }
            }]
        });
        
        var notas = realm.objects('nota');
        this.state = {
            FlatListItems: notas,
        };

        ListViewItemSeparator = () => {
            return (
            <View style={{ height: 1, width: '100%', backgroundColor: '#000' }} />
            );
        };
        
        realm.addListener('change', () => {
            this.reloadData();
            });

    }

    reloadData = () => { this.setState({FlatListItems: realm.objects('nota')}); }

    GoToAddNota = () => { this.props.navigation.navigate('AddNota'); }
    GoBack = () => { this.props.navigation.navigate('Login'); }
    actionOnRow(item) { this.props.navigation.navigate('EditarNota', item); }


    render() {
        
        return(
          <View style = { styles.MainContainer }>
          <FlatList
                data={this.state.FlatListItems}
                ItemSeparatorComponent={this.ListViewItemSeparator}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableWithoutFeedback onPress={ () => this.actionOnRow(item)}>
                        <View style={{ backgroundColor: 'white', padding: 23}}>
                            {/*<Text>Id: {item.id}</Text>*/}
                            <Text 
                            style={{ fontSize: 20, fontWeight: 'bold' }}>
                            {item.titulo} </Text>
                            <Text style={{ fontSize: 15}}>{item.local}</Text>
                            <Text style={{ marginTop: 5 }}>{item.descricao}</Text>
                            <Text style={{ textAlign: 'right' }}>{item.data}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                 )}
            />
            <View style = { styles.containerBtns }>
                <TouchableOpacity
                    style = {styles.btn}
                    onPress={ this.GoBack}>
                    <Text style={styles.text}> Voltar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style = {styles.btn}
                    onPress={this.GoToAddNota}>
                    <Text style={styles.text}> Adicionar Nota</Text>
                </TouchableOpacity>
            </View>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    MainContainer :{
     flex:1,
     justifyContent: 'center',
     paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
     backgroundColor: 'white'
    },
    containerBtns: {
       flexDirection: 'row',
    },
    btn: {
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
    textViewContainer: {
     textAlignVertical:'center',
     padding:10,
     fontSize: 20,
     color: '#000',
    }
 });

export default Lista;