import React, {useState} from 'react';
import {Text, View, Button, Alert} from 'react-native';

import {StackActions} from '@react-navigation/native';

function Mapa({route, navigation}) {
  const {id} = route.params;

  return (
    <View style={{flex: 1, padding: 24}}>
      <Text>{id}</Text>
      <Button
        title="Logout"
        onPress={() => navigation.dispatch(StackActions.replace('Login'))}
      />
    </View>
  );
}

export default Mapa;
