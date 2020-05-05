import React from 'react';
import { View, Text, Buttom } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './../pages/Login';
import Mapa from './../pages/Mapa';
import StackLista from './../routes/StackLista';

const Stack = createStackNavigator();

function StackLogin({navigation}) {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'SafeCity',  headerShown: false  } }
        />
        <Stack.Screen
          name="Mapa"
          component={Mapa}
          options={{ title: 'SafeCity',  headerShown: false  } }
        />
        <Stack.Screen
          name="StackLista"
          component={StackLista}
          options={{ title: 'SafeCity',  headerShown: false  } }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackLogin;