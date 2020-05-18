import React, {useState} from 'react';
import {Text, View, Button, Alert, StyleSheet} from 'react-native';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

import {StackActions} from '@react-navigation/native';

function Mapa({route, navigation}) {
  const {id} = route.params;

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}></MapView>
      <Button
        title="Logout"
        onPress={() => navigation.dispatch(StackActions.replace('Login'))}
      />
      <Text style={{fontSize: 24}}>{id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Mapa;
