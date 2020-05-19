import React, {useState} from 'react';
import {
  Text,
  View,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

import {StackActions} from '@react-navigation/native';

function Mapa({route, navigation}) {
  const {id} = route.params;

  function actionButtuon() {
    Alert.alert('Lista de Pontos!');
  }

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

      <TouchableOpacity onPress={actionButtuon} style={styles.btnListaDireita}>
        <Image
          source={require('./../images/list.png')}
          style={styles.FloatingButtonStyle}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.dispatch(StackActions.replace('Login'))}
        style={styles.btnListaEsquerda}>
        <Image
          source={require('./../images/logout.png')}
          style={styles.FloatingButtonStyle}
        />
      </TouchableOpacity>

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
  btnListaDireita: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  btnListaEsquerda: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    left: 30,
    bottom: 30,
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 35,
    height: 35,
    //backgroundColor:'black'
  },
});

export default Mapa;
