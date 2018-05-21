'use strict'
import React from 'react';
import { StyleSheet, Text, View, Alert, Navigator, Image, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import {  Button, Card, SearchBar, Header } from 'react-native-elements';
import Modal from 'react-native-modalbox'
import Icon from 'react-native-vector-icons/FontAwesome';
import { TabNavigator } from 'react-navigation';

import JugadorCont from '../Controllers/JugadorController';

export default class JugadoresView extends React.Component {
  constructor(props){ 
    super(props);
    this.state ={ isLoading: false, Jugadores: [], Backup: []}
  }
  componentDidMount(){
    JugadorCont.Get().then((res) =>{
      this.ChangeState(true, res, res);
    });
  }
  ChangeState(Load, Jugadores, Backup){
    this.setState({
      isLoading: Load,
      Jugadores: Jugadores,
      Backup: Backup,
    }, function(){});
    console.log(Backup);
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
        <View style={styles.ScrollContainer}>
        <ScrollView>
          <View style={styles.Container}>
            <View style={{marginTop: 30, flex: 1, paddingLeft: 10}}>
              <SearchBar
                lightTheme
                searchIcon={{ size: 24 }}
                clearIcon={{ color: 'red' }}
                onChangeText={(Text) => this.ChangeState(true, this.state.Backup.filter(item => {return item.sNombre.match(Text.toUpperCase())}), this.state.Backup)}
               placeholder='Buscar' />
            </View>
            <View style={{flex: 1, marginTop: 30,}}>
              <Button raised icon={{ name: 'plus-circle', type: 'font-awesome', size: 30}} title='Añadir' buttonStyle={styles.Boton}/>
            </View>
          </View>
        <View>
          {this.state.Jugadores.map((Jugador, i) =>{
            return(            
              <Card title='Jugador' image={{ uri: Jugador.uJugador }} key={Jugador.Id}>
                <Text style={{marginBottom: 10}}>Id : {Jugador.Id}</Text>
                <Text style={{marginBottom: 10}}>Nombre : {Jugador.sNombre}</Text>
                <Text style={{marginBottom: 10}}>Edad : {Jugador.iEdad}</Text>
                <Text style={{marginBottom: 10}}>Nacionalidad : {Jugador.sNacionalidad}</Text>
                <Text style={{marginBottom: 10}}>Equipo : {Jugador.sEquipo.sNombre}</Text>
                <Button large icon={{ name: 'eye', type: 'font-awesome', size: 30}}
                  backgroundColor='#03A9F4'
                  buttonStyle={{borderRadius: 20, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                  onPress={() => this.refs.Modal.open()}
                title='Ver Jugador' />
              </Card>);
          })}
        </View>
      </ScrollView>
        <Modal style={[styles.Modal]} position={"center"} ref={"Modal"} isDisabled={false} backdropPressToClose={false} swipeToClose={false}>
            <View style={styles.HeaderModal}>
              <View style={styles.Container}>
                <Text style={{fontWeight: 'bold', color: 'white', marginLeft: 10, marginTop: 10, flex: 3}}>Nombre Del Jugador</Text>
                <Button large icon={{ name: 'times', type: 'font-awesome', size:30}} buttonStyle={{backgroundColor: '#039be5', flex: .5, borderWidth: 0}} onPress={() => this.refs.Modal.close()}/>
              </View>
            </View>
        </Modal>
      </View>  
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
  Modal: {
    alignItems: 'flex-start',
    borderRadius: 20,
    shadowRadius: 20,
    width: Dimensions.get('window').width - 80,
    height: 400
  },
  HeaderModal: {
    flex: .1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowRadius: 20,
    width: Dimensions.get('window').width - 80,
    backgroundColor: '#039be5'
  },
});

module.exports = JugadoresView;