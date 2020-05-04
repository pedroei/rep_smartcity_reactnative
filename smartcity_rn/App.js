import React from 'react';
import { View, Text, Buttom } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/Login';
import Lista from './pages/Lista';

const Stack = createStackNavigator();

function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'SafeCity' }}
        />
        <Stack.Screen
          name="Lista"
          component={Lista}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
