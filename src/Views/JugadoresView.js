'use strict'
import React from 'react';
import { StyleSheet, Text, View, Alert, Navigator, Image, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import {  Button, Card, SearchBar } from 'react-native-elements';
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
          <View style={styles.Container}>
            <View style={{marginTop: 30, flex: 1, paddingLeft: 10}}>
              <SearchBar
                lightTheme
                searchIcon={{ size: 24 }}
                clearIcon={{ color: 'red' }}
                // onChangeText={someMethod}
                // onClear={someMethod}
              placeholder='Buscar' />
            </View>
            <View style={{flex: 1, marginTop: 30,}}>
              <Button raised icon={{ name: 'plus-circle', type: 'font-awesome'}} title='Añadir' buttonStyle={styles.Boton}/>
            </View>
          </View>
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
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: 100}}>
          <ActivityIndicator size='large' color='#0000ff' />
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
    height: 60,
    backgroundColor: '#6200ea',
    justifyContent: 'center',
    borderRadius: 20,
  },
  Container: { 
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }, 
});

module.exports = JugadoresView;