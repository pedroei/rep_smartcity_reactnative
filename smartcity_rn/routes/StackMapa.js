import React, {useContext} from 'react';
import {View, Text, Buttom} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {LocalizationContext} from './../services/localization/LocalizationContext';

import Mapa from './../pages/Mapa';
import AddProblema from './../pages/AddProblema';

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
        options={{title: 'SmartCity', headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default StackMapa;
