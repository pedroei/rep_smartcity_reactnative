import React from 'react';
import {View, Text, Buttom} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './../pages/Login';
import Registar from './../pages/Registar';
import StackLista from './../routes/StackLista';
import StackMapa from './../routes/StackMapa';

const Stack = createStackNavigator();

function StackLogin({navigation}) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'SmartCity', headerShown: false}}
        />
        <Stack.Screen
          name="Registar"
          component={Registar}
          options={({navigation}) => ({title: 'Registar', headerShown: false})}
        />
        <Stack.Screen
          name="StackMapa"
          component={StackMapa}
          options={{title: 'SmartCity', headerShown: false}}
        />
        <Stack.Screen
          name="StackLista"
          component={StackLista}
          options={{title: 'SmartCity', headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackLogin;
