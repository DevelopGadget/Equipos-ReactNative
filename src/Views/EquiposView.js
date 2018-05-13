'use strict'
import React from 'react';
import { StyleSheet, Text, View, Alert, Navigator, Image, ScrollView, Dimensions } from 'react-native';
import { Button, Card } from 'react-native-elements';
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
    const Equipo = [
      {
        Id : '5a99a5b1d1c42b00015d3352',
        Nombre : 'REAL MADRID C.F',
        Estadio : 'CAMP NOU',
        Url : 'https://thumbnails.trvl-media.com/2r4Lx99ckLFJgPdJEG7jVZ1DmHs=/cdn.lemediavault.com/images/62b30d184be2af6c6dc455b78cc3dc2a.jpeg'
      }
    ];
    return (
        <ScrollView style={styles.ScrollContainer}>
          <Button raised icon={{ name: 'plus-circle', type: 'font-awesome'}} title='Añadir' buttonStyle={styles.Boton}/>
          <View>
            <Card title='Equipos' image={{ uri: Equipo[0].Url }}>
              <Text style={{marginBottom: 10}}>Id : {Equipo[0].Id}</Text>
              <Text style={{marginBottom: 10}}>Nombre : {Equipo[0].Nombre}</Text>
              <Text style={{marginBottom: 10}}>Estadio : {Equipo[0].Estadio}</Text>
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
    backgroundColor: '#6200ea',
    width: Dimensions.get('window').width,
    height: 60,
    justifyContent: 'center',
    borderRadius: 20,
  },
});

module.exports = EquiposView;