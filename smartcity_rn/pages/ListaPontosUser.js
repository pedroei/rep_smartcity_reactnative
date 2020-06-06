import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Alert,
  TouchableOpacity,
} from 'react-native';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import {StackActions} from '@react-navigation/native';

function ListaPontosUser({route, navigation}) {
  const {id} = route.params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id_utilizador: id,
      }),
    };
    fetch(
      'https://pedroacm.000webhostapp.com/cm/cm/index.php/api/problemasUser',
      requestOptions,
    )
      .then((response) => response.json())
      .then((json) => setData(json.DATA))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  //Tem de ter o [] senão esta sempre a fazer pedidos e ultrapassa o limite de pedidos do 000webhost (pode causar alguns bugs mas o limite não é ultrapassado)

  function deleteSwipe(progress, dragX) {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.containerSwipe}>
        <Animated.Text
          style={[styles.textSwipe, {transform: [{scale: scale}]}]}>
          Apagar
        </Animated.Text>
      </View>
    );
  }

  function alertDelete(item) {
    Alert.alert('Info', 'Quer apagar?', [
      {
        text: 'Nao',
        onPress: () => console.log('Cancelado'),
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => {
          console.log('Apagar');
        },
      },
    ]);
  }

  function editarProblema(item, navigation) {
    navigation.navigate('EditarPontoUser', item);
  }

  return (
    <View style={styles.MainContainer}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
              }}></View>
          )}
          keyExtractor={({id}, index) => id}
          renderItem={({item}) => (
            <Swipeable
              renderRightActions={deleteSwipe}
              onSwipeableRightOpen={() => alertDelete(item)}>
              <TouchableWithoutFeedback
                onPress={() => editarProblema(item, navigation)}>
                <View style={{backgroundColor: 'white', padding: 23}}>
                  {/*<Text>Id: {item.id}</Text>*/}
                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    {item.titulo}{' '}
                  </Text>
                  <Text numberOfLines={1} style={{fontSize: 17}}>
                    {item.descricao}
                  </Text>
                  <Text
                    style={{fontSize: 17, marginTop: 5, textAlign: 'right'}}>
                    {item.estado}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </Swipeable>
          )}
        />
      )}
      <View style={styles.containerBtns}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.dispatch(StackActions.replace('Mapa'))}>
          <Text style={styles.text}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ListaPontosUser;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: 'white',
  },
  containerSwipe: {
    backgroundColor: 'red',
    justifyContent: 'center',
    flex: 1,
  },
  textSwipe: {
    color: 'white',
    fontSize: 17,
    padding: 20,
    textAlign: 'right',
  },
  containerBtns: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btn: {
    width: 150,
    padding: 10,
    borderRadius: 25,
    margin: 12,
    backgroundColor: 'rgba(72,61,139, 0.8)',
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
