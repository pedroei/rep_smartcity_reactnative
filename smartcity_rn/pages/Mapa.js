import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import {StackActions} from '@react-navigation/native';

function Mapa({route, navigation}) {
  const {id} = route.params;

  //Serve para a verificacao se o marker esta ativo ou não
  const estado = 'Resolvido';

  const [error, setError] = useState();
  const [initialPosition, setInitialPosition] = useState({
    latitude: 0.0,
    longitude: 0.0,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const [markerPosition, setMarkerPosition] = useState({
    latitude: 0.0,
    longitude: 0.0,
  });

  const handleSuccess = (position) => {
    var lat = parseFloat(position.coords.latitude);
    var long = parseFloat(position.coords.longitude);

    var initialRegion = {
      latitude: lat,
      longitude: long,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    };
    setInitialPosition(initialRegion);
    setMarkerPosition(initialRegion);
  };

  const handleError = (error) => {
    setError(error.message);
  };

  //CORRE UMA VEZ SEMPRE QUE ABRIR ESTE ECRA!
  useEffect(() => {
    Geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  //WATCH
  useEffect(() => {
    const watchId = Geolocation.watchPosition(handleSuccess, handleError);
    return () => Geolocation.clearWatch(watchId);
  }, []);

  function actionButtuon() {
    Alert.alert('Lista de Pontos!');
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={initialPosition}>
        <Marker
          key={1} //Trocar a key ao trocar a cor senão a cir nao muda!
          coordinate={markerPosition}
          pinColor={estado == 'Ativo' ? 'red' : 'green'}>
          <Callout
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>Titulo</Text>
            <Text>Descrição</Text>
            <Text>
              <Image
                style={{height: 50, width: 50}}
                source={require('./../images/city.png')}
              />
            </Text>
          </Callout>
        </Marker>
      </MapView>

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
