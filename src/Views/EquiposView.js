'use strict'
import React from 'react';
import { StyleSheet, Text, View, Alert, Navigator } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TabNavigator } from 'react-navigation';

export default class EquiposView extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Equipos'
  }
  render() {
    return (
      <View style={styles.container}>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});