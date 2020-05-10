
import React, { Component} from 'react';
import { StyleSheet, Platform, View, Button, Image, Text, TextInput, TouchableOpacity, Alert, YellowBox, ListView, FlatList, TouchableWithoutFeedback, Animated } from 'react-native';

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Swipeable from 'react-native-gesture-handler/Swipeable';

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
            id: '',
        };

        
        realm.addListener('change', () => {
            this.reloadData();
            });

    }

    reloadData = () => { this.setState({FlatListItems: realm.objects('nota')}); }

    GoToAddNota = () => { this.props.navigation.navigate('AddNota'); }
    GoBack = () => { this.props.navigation.navigate('Login'); }
    actionOnRow(item) { this.props.navigation.navigate('EditarNota', item); }

    deleteSwipe = (progress, dragX) => { 

        const scale = dragX.interpolate({
            inputRange:[-100, 0],
            outputRange:[1, 0],
            extrapolate: 'clamp'
        })

        return(
            <TouchableOpacity onPress={ this.alertDelete }> 
                <View style = { styles.containerSwipe }>
                    <Animated.Text style = { [styles.textSwipe, {transform: [{ scale: scale }] } ] }>Apagar</Animated.Text>
                </View> 
            </TouchableOpacity>
        );
    }

    alertDelete = () =>{
        Alert.alert(
            'Info',
            'Tem a certeza que quer apagar este registo?',
            [
                { text: 'Não' },
                {
                    text: 'Sim',
                    onPress: () =>{
                        //Esta linha recarrega a pagina, arranjar outra maneira de fechar o swipe!
                        //this.props.navigation.dispatch(StackActions.replace('Lista'))
                        realm.write(() => {
                            let task = realm.objects('nota').filtered('id = ' + this.state.id);
                            realm.delete(task);
                        });
                    }
                },
            ],
        );
    }

    render() {
        
        return(
          <View style = { styles.MainContainer }>
          <FlatList
                data={this.state.FlatListItems}
                ItemSeparatorComponent={() => <View style={{ height: 1, width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}></View>}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Swipeable
                        renderRightActions={this.deleteSwipe}
                        //onSwipeableRightOpen={this.alertDelete}
                    >
                        <TouchableWithoutFeedback onPress={ () => this.actionOnRow(item)}>
                            <View style={{ backgroundColor: 'white', padding: 23}}>
                                <Text>Id: {item.id}</Text>
                                <Text 
                                style={{ fontSize: 20, fontWeight: 'bold' }}>
                                {item.titulo} </Text>
                                <Text style={{ fontSize: 15}}>{item.local}</Text>
                                <Text style={{ marginTop: 5 }}>{item.descricao}</Text>
                                <Text style={{ textAlign: 'right' }}>{item.data}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </Swipeable>
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
    },
    containerSwipe: {
        backgroundColor: 'red',
        justifyContent: 'center',
        height: '100%'
    },
    textSwipe: {
        color: 'white',
        fontSize: 17,
        padding: 20,
        //textAlign: 'right'
    }
 });

export default Lista;