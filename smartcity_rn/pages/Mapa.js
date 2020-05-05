import React from 'react';
import { View, Text, Button} from 'react-native';

function Mapa ({ navigation }) {
    return (
        <View style={{ flex: 1, alginItems: 'center', justifyContent:'center' }}>
            <Text> Aqui vai ficar o mapa! </Text>
           
            <Button
                color="orange"
                title="Logout"
                onPress={ () => navigation.navigate('Login')}
            />  
        </View>
    );
}

export default Mapa;