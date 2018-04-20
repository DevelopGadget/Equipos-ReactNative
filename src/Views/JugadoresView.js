'use strict'
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TabNavigator } from 'react-navigation';

export default class JugadoresView extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Jugdores',
    tabBarIcon: ({ focused,tintColor }) => (
      <Image
        source={require('../Views/Images/Player.png')}
        style={[styles.icon, { color: tintColor }]}
      />
    )
}
  render() {
    return (
      <View style={styles.container}>
        <Text>Hola Jugador</Text>
        <Button title='Hola Mundo holw'/>
        <Button large icon={{name: 'squirrel', type: 'octicon', buttonStyle: styles.someButtonStyle }} title='OCTICON' />
      </View>
    );
  }
}

module.exports = JugadoresView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  }
});