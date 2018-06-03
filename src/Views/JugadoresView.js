'use strict'
import React from 'react';
import { StyleSheet, Text, View, Alert, Navigator, Image, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import {  Button, Card, SearchBar, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import Modal from 'react-native-modalbox'
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalDropdown from 'react-native-modal-dropdown';
import { TabNavigator } from 'react-navigation';
import JugadorCont from '../Controllers/JugadorController';
import EquiposCont from '../Controllers/EquipoController';

export default class JugadoresView extends React.Component {
  constructor(props){ 
    super(props);
    this.state ={ isLoading: false, Jugadores: [], Backup: [], Añadir: false, Seleccion: {Id: '', sNombre: '', iEdad: '', sNacionalidad: '', uJugador: '', uNacionalidad: '', sEquipo: {}, sPosicion: ''}, Equipos: []}
  }
  componentDidMount(){
    JugadorCont.Get().then((res) =>{
      this.ChangeState(true, res, res, false, {Id: '', sNombre: '', iEdad: '', sNacionalidad: '', uJugador: '', uNacionalidad: '', sEquipo: {}, sPosicion: ''}, []);
    });
    const Equipos = [];
    EquiposCont.Get().then((res) =>{
      res.map((Equipo, i) =>{
         Equipos.push(Equipo.sNombre);
      });
      this.ChangeState(true, this.state.Backup, this.state.Backup, false, {Id: '', sNombre: '', iEdad: '', sNacionalidad: '', uJugador: '', uNacionalidad: '', sEquipo: {}, sPosicion: ''},   Equipos);
    });
  }
  ChangeState(Load, Jugadores, Backup, Añadir, Seleccion, Equipos){
    this.setState({
      isLoading: Load,
      Jugadores: Jugadores,
      Backup: Backup,
      Añadir: Añadir,
      Seleccion: Seleccion,
      Equipos: Equipos
    }, function(){});
  }
  Añadir(){
    this.ChangeState(true, this.state.Backup, this.state.Backup, true, {Id: '', sNombre: '', iEdad: '', sNacionalidad: '', uJugador: '', uNacionalidad: '', sEquipo: {}, sPosicion: ''}, this.state.Equipos);
    this.refs.Modal.open();
  }
  ButtonCard(Jugador){
    this.ChangeState(true, this.state.Backup, this.state.Backup, false, Jugador, this.state.Equipos);
    this.refs.Modal.open();
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
    const Titulo = this.state.Añadir ? ('Registrar') : (this.state.Seleccion.sNombre);
    const button = this.state.Añadir ? (
      <View style={{flex: .2, flexDirection: 'row', marginTop: 10}}>
      <View style={{flex: 1}}>
        <Button large icon={{ name: 'location-arrow', type: 'font-awesome', size: 30}} title='Añadir' buttonStyle={[styles.Boton, {backgroundColor: '#00e676'}]}/>
      </View>
    </View>
    ) : (
      <View style={{flex: .2, flexDirection: 'row', marginTop: 10}}>
        <View style={{flex: 1}}>
          <Button large icon={{ name: 'wrench', type: 'font-awesome', size: 30}} title='Modificar' buttonStyle={[styles.Boton, {backgroundColor: '#448aff'}]}/>
        </View>
        <View style={{flex: 1}}>
          <Button large icon={{ name: 'trash', type: 'font-awesome', size: 30}} title='Eliminar' buttonStyle={[styles.Boton, {backgroundColor: '#ff1744'}]}/>
        </View>
      </View>
    );
    if(this.state.isLoading){
      return(
        <View style={styles.ScrollContainer}>
        <ScrollView>
          <View style={styles.Container}>
            <View style={{marginTop: 30, flex: 1, paddingLeft: 10}}>
              <SearchBar
                lightTheme
                searchIcon={{ size: 30 }}
                clearIcon={{ color: 'red' }}
                onChangeText={(Text) => this.ChangeState(true, this.state.Backup.filter(item => {return item.sNombre.match(Text.toUpperCase())}), this.state.Backup, false, {})}
               placeholder='Buscar' />
            </View>
            <View style={{flex: 1, marginTop: 30,}}>
              <Button large icon={{ name: 'plus-circle', type: 'font-awesome', size: 30}} title='Añadir' buttonStyle={styles.Boton}  onPress={() => this.Añadir()}/>
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
                  onPress={() => this.ButtonCard(Jugador)}
                title='Ver Jugador' />
              </Card>);
          })}
        </View>
      </ScrollView>
        <Modal style={[styles.Modal]} position={"center"} ref={"Modal"} isDisabled={false} backdropPressToClose={false} swipeToClose={false}>
            <View style={styles.HeaderModal}>
              <View style={styles.Container}>
                <Text style={{fontWeight: 'bold', color: 'white', marginLeft: 10, marginTop: 10, flex: 4}}>{Titulo}</Text>
                <Button large iconRight={{ name: 'times', type: 'font-awesome', size: 30}} buttonStyle={{backgroundColor: '#039be5', flex: .5, borderWidth: 0}} onPress={() => this.refs.Modal.close()}/>
              </View>
            </View>
            <View style={{flex: .2, flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <FormLabel>Nombre Jugador:</FormLabel>
                <FormInput defaultValue={this.state.Seleccion.sNombre}/>
                <FormValidationMessage>{'Campo vacio'}</FormValidationMessage>
              </View>
              <View style={{flex: 1}}>
                <FormLabel>Edad Jugador:</FormLabel>
                <FormInput defaultValue={this.state.Seleccion.iEdad.toString()}/>
                <FormValidationMessage>{'Campo vacio'}</FormValidationMessage>
              </View>
            </View>
            <View style={{flex: .2,flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <FormLabel>Posición:</FormLabel>
                <FormInput defaultValue={this.state.Seleccion.sPosicion}/>
                <FormValidationMessage>{'Campo vacio'}</FormValidationMessage>
              </View>
              <View style={{flex: 1}}>
                <FormLabel>Nacionalidad:</FormLabel>
                <FormInput defaultValue={this.state.Seleccion.sNacionalidad}/>
                <FormValidationMessage>{'Campo vacio'}</FormValidationMessage>
              </View>
            </View>
            <View style={{flex: .2,flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <FormLabel>Url Selección:</FormLabel>
                <FormInput defaultValue={this.state.Seleccion.uNacionalidad}/>
                <FormValidationMessage>{'Tiene que ser Url de imagen'}</FormValidationMessage>
              </View>
              <View style={{flex: 1}}>
                <FormLabel>Url Persona:</FormLabel>
                <FormInput defaultValue={this.state.Seleccion.uJugador}/>
                <FormValidationMessage>{'Tiene que ser Url de imagen'}</FormValidationMessage>
              </View>
            </View>
            <View style={{flex: .2, flexDirection: 'row', marginTop: 15}}>
              <View style={{flex: 1}}>
                <FormLabel>Seleccione Equipo:</FormLabel>
                <ModalDropdown dropdownStyle={{width: 100}} style={styles.ComboBox} textStyle={{fontSize: 14, marginTop: 4, marginLeft: 20}} options={this.state.Equipos} defaultValue={this.state.Seleccion.sEquipo.sNombre}/>
                <FormValidationMessage>{'Seleccione un equipo'}</FormValidationMessage>
              </View>
            </View>
            {button}
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
    borderRadius: 20,
    shadowRadius: 20,
    width: Dimensions.get('window').width - 60,
    height: Dimensions.get('window').height - 80
  },
  HeaderModal: {
    flex: .08,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowRadius: 20,
    width: Dimensions.get('window').width - 60,
    backgroundColor: '#039be5'
  },
  ComboBox: {
    borderWidth: 1, 
    borderColor: '#b3e5fc', 
    borderRadius: 20, 
    backgroundColor: '#b3e5fc', 
    marginLeft: 20, 
    marginRight: 20,
    height: 30 
  },
});

module.exports = JugadoresView;