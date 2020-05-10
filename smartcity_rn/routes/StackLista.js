import React, {useContext} from 'react';
import { View, Text, Buttom } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {LocalizationContext} from './../services/localization/LocalizationContext';

import Lista from './../pages/Lista';
import AddNota from './../pages/AddNota';
import EditarNota from './../pages/EditarNota';

const Stack = createStackNavigator();

function StackLista({navigation}) {
  const {translations} = useContext(LocalizationContext);

  return(
      <Stack.Navigator initialRouteName="Lista">
        <Stack.Screen
          name="Lista"
          component={Lista}
          options={{ title: translations.notas_pessoais }}
        />
        <Stack.Screen
          name="AddNota"
          component={AddNota}
          options={{ title: translations.add_nota }}
        />
        <Stack.Screen
          name="EditarNota"
          component={EditarNota}
          options={{ title: translations.edit_nota }}
        />
      </Stack.Navigator>
  );
}

export default StackLista;
