'use strict'
import React from 'react';
import { StyleSheet, Text, View, Alert, Navigator, Image, ScrollView, Dimensions } from 'react-native';
import { Button, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TabNavigator } from 'react-navigation';

var Equipos = require('..//Controllers/EquipoController');

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
    var Equipo = Equipos.Get();
    console.log(Equipo);
    return (
      <ScrollView style={styles.ScrollContainer}>
        <Button raised icon={{ name: 'plus-circle', type: 'font-awesome'}} title='Añadir' buttonStyle={styles.Boton}/>
        <View>
          <Card title='Equipos' image={{ uri: Equipo[0].uEscudo }}>
            <Text style={{marginBottom: 10}}>Id : {Equipo[0].Id}</Text>
            <Text style={{marginBottom: 10}}>Nombre : {Equipo[0].sNombre}</Text>
            <Text style={{marginBottom: 10}}>Estadio : {Equipo[0].sEstadio}</Text>
            <Button large icon={{ name: 'eye', type: 'font-awesome'}}
              backgroundColor='#03A9F4'
              buttonStyle={{borderRadius: 20, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title='Ver Equipo' />
          </Card>
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
  Boton: {
    marginTop: 20,
    backgroundColor: '#6200ea',
    height: 60,
    justifyContent: 'center',
    borderRadius: 20,
  },
});

module.exports = EquiposView;