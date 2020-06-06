import React, {useContext} from 'react';
import {View, Text, Buttom} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {LocalizationContext} from './../services/localization/LocalizationContext';

import Mapa from './../pages/Mapa';
import AddProblema from './../pages/AddProblema';
import ListaPontosUser from './../pages/ListaPontosUser';
import EditarPontoUser from './../pages/EditarPontoUser';

const Stack = createStackNavigator();

function StackMapa({navigation}) {
  const {translations} = useContext(LocalizationContext);

  return (
    <Stack.Navigator initialRouteName="Mapa">
      <Stack.Screen
        name="Mapa"
        component={Mapa}
        options={{title: 'SmartCity', headerShown: false}}
      />
      <Stack.Screen
        name="AddProblema"
        component={AddProblema}
        options={{title: 'SmartCity'}}
      />
      <Stack.Screen
        name="ListaPontosUser"
        component={ListaPontosUser}
        options={{title: 'Pontos do Utilizador', headerLeft: null}}
      />
      <Stack.Screen
        name="EditarPontoUser"
        component={EditarPontoUser}
        options={{title: 'Pontos do Utilizador'}}
      />
    </Stack.Navigator>
  );
}

export default StackMapa;
