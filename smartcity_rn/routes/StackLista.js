import React from 'react';
import { View, Text, Buttom } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Lista from './../pages/Lista';
import AddNota from './../pages/AddNota';
import EditarNota from './../pages/EditarNota';

const Stack = createStackNavigator();

function StackLista({navigation}) {
  return(
      <Stack.Navigator initialRouteName="Lista">
        <Stack.Screen
          name="Lista"
          component={Lista}
          options={{ title: 'Notas Pessoais' }}
        />
        <Stack.Screen
          name="AddNota"
          component={AddNota}
          options={{ title: 'Adicionar Nota' }}
        />
        <Stack.Screen
          name="EditarNota"
          component={EditarNota}
          options={{ title: 'Editar Nota' }}
        />
      </Stack.Navigator>
  );
}

export default StackLista;
