'use strict'
import React from 'react';
import { StyleSheet, Text, View, Alert, Navigator, Image, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import {  Button, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TabNavigator } from 'react-navigation';

import JugadorCont from '../Controllers/JugadorController';

export default class JugadoresView extends React.Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: false, Equipos: []}
  }
  componentDidMount(){
    JugadorCont.Get().then((res) =>{
      this.setState({
        isLoading: true,
        Jugadores: res
      }, function(){});
    });
  }
  static navigationOptions = {
    tabBarLabel: 'Jugdores',
    tabBarIcon: ({ focused,tintColor }) => (
      <Image
        source={require('../Views/Images/Player.png')}
        style={[styles.Icon]}
      />
    )
  }
  render() {
    if(this.state.isLoading){
      return(
        <ScrollView style={styles.ScrollContainer}>
        <Button raised icon={{ name: 'plus-circle', type: 'font-awesome'}} title='Añadir' buttonStyle={styles.Boton}/>
        <View>
          {this.state.Jugadores.map((Jugador, i) =>{
            return(            
              <Card title='Equipos' image={{ uri: Jugador.uJugador }}>
                <Text style={{marginBottom: 10}}>Id : {Jugador.Id}</Text>
                <Text style={{marginBottom: 10}}>Nombre : {Jugador.sNombre}</Text>
                <Text style={{marginBottom: 10}}>Edad : {Jugador.iEdad}</Text>
                <Text style={{marginBottom: 10}}>Nacionalidad : {Jugador.sNacionalidad}</Text>
                <Text style={{marginBottom: 10}}>Equipo : {Jugador.sEquipo.sNombre}</Text>
                <Button large icon={{ name: 'eye', type: 'font-awesome'}}
                  backgroundColor='#03A9F4'
                  buttonStyle={{borderRadius: 20, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='Ver Equipo' />
              </Card>);
          })}
        </View>
      </ScrollView>
      );
    }else{
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size='large' color='#0000ff' style={{height: 140}}/>
        </View>
      );
    }
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
    marginTop: 30,
    backgroundColor: '#6200ea',
    height: 60,
    justifyContent: 'center',
    borderRadius: 20,
  },
});

module.exports = JugadoresView;