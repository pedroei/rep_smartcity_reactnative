import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Button } from 'react-native';

function Mapa ({ navigation }) {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://reactnative.dev/movies.json')
      .then((response) => response.json())
      .then((json) => setData(json.movies))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  });

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {loading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>Ti­tulo: {item.title}, Ano: {item.releaseYear}</Text>
          )}
        />
      )}
    <Button
      style={{ marginTop: 10 }}
      color="orange"
      title="Logout"
      onPress={ () => navigation.navigate('Login')}/>
    </View>
  );

};

export default Mapa;