import React, { Component, useState, useEffect, useContext } from 'react';
import { StyleSheet, Platform, View, Button, TouchableWithoutFeedback, Image, Text, TextInput, TouchableOpacity, Alert, YellowBox, FlatList } from 'react-native';

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {LocalizationContext} from './../services/localization/LocalizationContext';

import Realm from 'realm';

const realm = new Realm({
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
      }}]
});

const query = () => realm.objects('nota');

function getupdateddata(query) {
  const [data, setData] = useState(query());

  useEffect(
      () => {
        function handleChange(newData) {
          setData([...newData]);
        }
        const dataQuery = query();
        dataQuery.addListener(handleChange);
        return () => {
          dataQuery.removeAllListeners();
        };
      },
      [query]
  );
  return data;
}

function actionOnRow(item, navigation) {
    navigation.navigate('EditarNota', item);
}

function Lista({ navigation }) {
  const {translations} = useContext(LocalizationContext);
  const notas = getupdateddata(query);

  return(
     <View style = { styles.MainContainer }>
         <FlatList
            data={notas}
            ItemSeparatorComponent={() => <View style={{ height: 1, width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}></View>}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback onPress={ () => actionOnRow(item, navigation)}>
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
                onPress={ () => navigation.navigate('Login') }>
                <Text style={styles.text}>{translations.voltar}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style = {styles.btn}
                onPress={ () => navigation.navigate('AddNota') }>
                <Text style={styles.text}>{translations.add_nota}</Text>
            </TouchableOpacity>
        </View>
     </View>
  );

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
        flex: 1
    },
    textSwipe: {
        color: 'white',
        fontSize: 17,
        padding: 20,
        textAlign: 'right'
    }
 });

export default Lista;
