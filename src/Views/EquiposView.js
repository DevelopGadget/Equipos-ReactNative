'use strict'
import React from 'react';
import { StyleSheet, Text, View, Alert, Navigator, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TabNavigator } from 'react-navigation';

export default class EquiposView extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Equipos',
    tabBarIcon: ({ focused,tintColor }) => (
      <Image
        source={require('../Views/Images/Team.png')}
        style={[styles.icon, { color: tintColor }]}
      />
    )
  }
  render() {
    return (
      <View>
        <Text>Hola Equipo</Text>
        <Button title='Hola Mundo' onPress={(this.Alerta.bind(this))}/>
      </View>
    );
  }
  Alerta(){
  Alert.alert('Prueba','Prueba', [])
}
}

module.exports = EquiposView;

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    color : 'transparent'
  },
});