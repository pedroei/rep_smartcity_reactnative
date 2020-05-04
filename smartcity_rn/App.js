import React from 'react';
import { View, Text, Buttom } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/Login';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
