'use strict'
import React from 'react';
import { StyleSheet, Text, View, Alert, Navigator, Image, ScrollView, Dimensions } from 'react-native';
import { Button, ListItem, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TabNavigator } from 'react-navigation';

export default class EquiposView extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Equipos',
    tabBarIcon: ({ focused,tintColor }) => (
      <Image
        source={require('../Views/Images/Team.png')}
        style={[styles.Icon]}
      />
    ) 
  }
  
  render() {
    return (
      <ScrollView style={styles.ScrollContainer}>
        <Button large icon={{name: 'plus-circle', type: 'font-awesome', buttonStyle: styles.Boton }} title='Añadir' />
        <View style={styles.Container}>
          <View style={styles.Box}/>
          <View style={styles.Box}/>
          <View style={styles.Box}/>
          <View style={styles.Box}/>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  Icon: {
    width: 30,
    height: 30,
  },
  ScrollContainer: {
    flex : 1,
  },
  Container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 2,
  },
  Box: {
    margin: 2,
    width: Dimensions.get('window').width -6,
    height: Dimensions.get('window').height / 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1c40f',
  },
  Boton: {
    backgroundColor: '#6200ea',
    padding: 2,
    margin: 2,
    width: Dimensions.get('window').width,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

module.exports = EquiposView;