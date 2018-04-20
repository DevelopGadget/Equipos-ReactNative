'use strict'
import React from 'react';
import { StyleSheet, Text, View, Alert, Navigator, Image, Card } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TabNavigator } from 'react-navigation';

export default class JugadorReg extends React.Component {
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
const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30  
  },
});