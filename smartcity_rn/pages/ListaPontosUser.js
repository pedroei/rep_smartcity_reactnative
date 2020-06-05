import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, Button} from 'react-native';
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

  return (
    <View style={{flex: 1, padding: 24}}>
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
            <View>
              <Text>Titulo: {item.titulo}</Text>
              <Text>Estado: {item.estado}</Text>
            </View>
          )}
        />
      )}
      <Button
        title="Voltar"
        onPress={() =>
          navigation.dispatch(StackActions.replace('Mapa'))
        }></Button>
    </View>
  );
}

export default ListaPontosUser;
