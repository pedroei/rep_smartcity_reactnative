import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';

import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import {StackActions} from '@react-navigation/native';

let markersURL =
  'https://pedroacm.000webhostapp.com/cm/cm/index.php/api/problemas';

function Mapa({route, navigation}) {
  const {id} = route.params;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [addLat, setAddLat] = useState('');
  const [addLong, setAddLong] = useState('');

  //Serve para a verificacao se o marker esta ativo ou não
  //const estado = 'Resolvido';

  const [error, setError] = useState();
  const [initialPosition, setInitialPosition] = useState({
    latitude: 0.0,
    longitude: 0.0,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  /*const [markerPosition, setMarkerPosition] = useState({
    latitude: 0.0,
    longitude: 0.0,
  });*/

  const handleSuccess = (position) => {
    var lat = parseFloat(position.coords.latitude);
    var long = parseFloat(position.coords.longitude);

    var initialRegion = {
      latitude: lat,
      longitude: long,
      latitudeDelta: 0.015,
      longitudeDelta: 0.015,
    };
    setInitialPosition(initialRegion);
    //setMarkerPosition(initialRegion);
    setAddLat(lat);
    setAddLong(long);
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

  //Markers do webservice
  useEffect(() => {
    fetch(markersURL)
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false), setData(responseJson.DATA);
      })
      .catch((error) => console.error(error));
  }, []);
  // É preciso o [] para que o webservice rode uma vez ao começar, senão excedo o limite de queries do 000webhost

  function actionButtuon() {
    Alert.alert('Lista de Pontos!');
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={initialPosition}>
        {data.map((marker) => (
          <Marker
            key={marker.id} //Trocar a key ao trocar a cor senão a cir nao muda!
            coordinate={{
              latitude: parseFloat(marker.latitude),
              longitude: parseFloat(marker.longitude),
            }}
            pinColor={marker.estado == 'Ativo' ? 'red' : 'green'}>
            <Callout
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>{marker.titulo}</Text>
              <Text>
                <Image
                  style={{height: 50, width: 50}}
                  source={{
                    uri:
                      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII=',
                  }}
                />
              </Text>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <TouchableOpacity onPress={actionButtuon} style={styles.btnListaDireita}>
        <Image
          source={require('./../images/list.png')}
          style={styles.FloatingButtonStyle}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('AddProblema', {
            id: id,
            lat: addLat,
            long: addLong,
          })
        }
        style={styles.btnPlus}>
        <Image
          source={require('./../images/plus.png')}
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

      {/*<Text style={{fontSize: 24}}>{id}</Text>
      <Text style={{fontSize: 24}}>{addLat}</Text>
      <Text style={{fontSize: 24}}>{addLong}</Text>*/}
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
    bottom: 20,
  },
  btnPlus: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 150,
    bottom: 20,
  },
  btnListaEsquerda: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    left: 30,
    bottom: 20,
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 40,
    height: 40,
    //backgroundColor:'black'
  },
});

export default Mapa;
