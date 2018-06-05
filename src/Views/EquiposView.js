'use strict'
import React from 'react';
import { StyleSheet, Text, View, Alert, Navigator, Image, ScrollView, Dimensions, ActivityIndicator, YellowBox } from 'react-native';
import { Button, Card, SearchBar, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modalbox'
import { TabNavigator } from 'react-navigation';
import EquiposCont from '../Controllers/EquipoController';

export default class EquiposView extends React.Component {
  constructor(props){
    super(props);
    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
    ]);
    this.state ={ isLoading: false, Equipos: [], Backup: [], Añadir: false, Seleccion: {sNombre: '', sEstadio: '', Id: '', uEstadio: '', uEscudo: ''}, 
    Valid:{sNombre: true, sEstadio: true, uEquipo: true, uEstadio: true}}
  }
  componentDidMount(){
    EquiposCont.Get().then((res) =>{
      this.ChangeState(true, res, res, false, {sNombre: '', sEstadio: '', Id: '', uEstadio: '', uEscudo: ''}, {sNombre: true, sEstadio: true, uEquipo: true, uEstadio: true});
    });
  }
  static navigationOptions = {
    tabBarLabel: 'Equipos',
    tabBarIcon: ({ focused,tintColor }) => (
      <Image
        source={require('../Views/Images/Team.png')}
        style={[styles.Icon]}
      />
    ) 
  }
  ChangeState(Load, Equipos, Backup, Añadir, Seleccion, Valid){
    this.setState({
      isLoading: Load,
      Equipos: Equipos,
      Backup: Backup,
      Añadir: Añadir,
      Seleccion: Seleccion,
      Valid: Valid
    }, function(){});
  }
  Añadir(){
    this.ChangeState(true, this.state.Backup, this.state.Backup, true, {sNombre: '', sEstadio: '', Id: '', uEstadio: '', uEscudo: ''}, {sNombre: true, sEstadio: true, uEquipo: true, uEstadio: true});
    this.refs.Modal.open();
  }
  ButtonCard(Equipo){
    this.ChangeState(true, this.state.Backup, this.state.Backup, false, Equipo, {sNombre: true, sEstadio: true, uEquipo: true, uEstadio: true});
    this.refs.Modal.open();
  }
  ValidEquipo(Equipo){
    var Nombre = true, Estadio = true, UrlE = true, UrlEs = true;
    if(Equipo.sNombre == null || Equipo.sNombre.length <= 0){
      Nombre = false;
    }
    if(Equipo.sEstadio == null || Equipo.sEstadio.length <= 0){
      Estadio = false;
    }
    this.ChangeState(this.state.isLoading, this.state.Backup, this.state.Backup, this.state.Añadir, this.state.Seleccion, {sNombre: Nombre, sEstadio: Estadio, uEquipo: UrlE, uEstadio: UrlEs});
    
  }

  render() {
    const Titulo = this.state.Añadir ? ('Registrar') : (this.state.Seleccion.sNombre);
    const button = this.state.Añadir ? (
      <View style={{flex: .2, flexDirection: 'row', marginTop: 40}}>
      <View style={{flex: 1}}>
        <Button large icon={{ name: 'location-arrow', type: 'font-awesome', size: 30}} title='Añadir' buttonStyle={[styles.Boton, {backgroundColor: '#00e676'}]} onPress={() => this.ValidEquipo(this.state.Seleccion)}/>
      </View>
    </View>
    ) : (
      <View style={{flex: .2, flexDirection: 'row', marginTop: 40}}>
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
                    onChangeText={(Text) => this.ChangeState(true, this.state.Backup.filter(item => {return item.sNombre.match(Text.toUpperCase())}), this.state.Backup, false, {sNombre: '', sEstadio: '', Id: '', uEstadio: '', uEscudo: ''}, {sNombre: true, sEstadio: true, uEquipo: true, uEstadio: true})}
                  placeholder='Buscar' />
                </View>
                <View style={{flex: 1, marginTop: 30,}}>
                  <Button large icon={{ name: 'plus-circle', type: 'font-awesome', size: 30}} title='Añadir' buttonStyle={styles.Boton} onPress={() => this.Añadir()}/>
                </View>
              </View>
              <View>
                {
                  this.state.Equipos.map((Equipo, i) =>{
                    return(
                      <Card title='Equipo' image={{ uri: Equipo.uEscudo }} key={Equipo.Id}>
                        <Text style={{marginBottom: 10}}>Id : {Equipo.Id}</Text>
                        <Text style={{marginBottom: 10}}>Nombre : {Equipo.sNombre}</Text>
                        <Text style={{marginBottom: 10}}>Estadio : {Equipo.sEstadio}</Text>
                        <Button large icon={{ name: 'eye', type: 'font-awesome', size: 30}}
                          backgroundColor='#03A9F4'
                          onPress={() => this.ButtonCard(Equipo)}
                          buttonStyle={{borderRadius: 20, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title='Ver Equipo' />
                      </Card>
                    );
                  })
                }
              </View>
            </ScrollView>
            <Modal style={[styles.Modal]} position={"center"} ref={"Modal"} isDisabled={false} backdropPressToClose={false} swipeToClose={false}>
              <View style={styles.HeaderModal}>
                <View style={styles.Container}>
                  <Text style={{fontWeight: 'bold', color: 'white', marginLeft: 10, marginTop: 10, flex: 4}}>{Titulo}</Text>
                  <Button large iconRight={{ name: 'times', type: 'font-awesome', size: 30}} buttonStyle={{backgroundColor: '#039be5', flex: .5, borderWidth: 0}} onPress={() => this.refs.Modal.close()}/>
                </View>
              </View>
              <View style={{flex: .3, flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <FormLabel>Nombre Equipo:</FormLabel>
                <FormInput defaultValue={this.state.Seleccion.sNombre} onChangeText={(sNombre) => this.ChangeState(this.state.isLoading, this.state.Backup, this.state.Backup, this.state.Añadir, {sNombre: sNombre, sEstadio: this.state.Seleccion.sEstadio, Id: this.state.Seleccion.Id, uEstadio: this.state.Seleccion.uEstadio, uEscudo: this.state.Seleccion.uEscudo}, this.state.Valid)}/>
                <FormValidationMessage>{this.state.Valid.sNombre ? null : 'Campo vacio'}</FormValidationMessage>
              </View>
              <View style={{flex: 1}}>
                <FormLabel>Nombre Estadio:</FormLabel>
                <FormInput defaultValue={this.state.Seleccion.sEstadio} onChangeText={(sEstadio) => this.ChangeState(this.state.isLoading, this.state.Backup, this.state.Backup, this.state.Añadir, {sNombre: this.state.Seleccion.sNombre, sEstadio: sEstadio, Id: this.state.Seleccion.Id, uEstadio: this.state.Seleccion.uEstadio, uEscudo: this.state.Seleccion.uEscudo}, this.state.Valid)}/>
                <FormValidationMessage>{this.state.Valid.sEstadio ? null : 'Campo vacio'}</FormValidationMessage>
              </View>
            </View>
            <View style={{flex: .3,flexDirection: 'row'}} marginTop={20}>
              <View style={{flex: 1}}>
                <FormLabel>Url Estadio:</FormLabel>
                <FormInput defaultValue={this.state.Seleccion.uEstadio} onChangeText={(uEstadio) => this.ChangeState(this.state.isLoading, this.state.Backup, this.state.Backup, this.state.Añadir, {sNombre: this.state.Seleccion.sNombre, sEstadio: this.state.Seleccion.sEstadio, Id: this.state.Seleccion.Id, uEstadio: uEstadio, uEscudo: this.state.Seleccion.uEscudo}, this.state.Valid)}/>
                <FormValidationMessage>{this.state.Valid.uEstadio ? null :'Tiene que ser Url de imagen'}</FormValidationMessage>
              </View>
              <View style={{flex: 1}}>
                <FormLabel>Url Escudo:</FormLabel>
                <FormInput defaultValue={this.state.Seleccion.uEscudo} onChangeText={(uEscudo) => this.ChangeState(this.state.isLoading, this.state.Backup, this.state.Backup, this.state.Añadir, {sNombre: this.state.Seleccion.sNombre, sEstadio: this.state.Seleccion.sEstadio, Id: this.state.Seleccion.Id, uEstadio: this.state.Seleccion.uEstadio, uEscudo: uEscudo}, this.state.Valid)}/>
                <FormValidationMessage>{this.state.Valid.uEquipo ? null :'Tiene que ser Url de imagen'}</FormValidationMessage>
              </View>
            </View>
            {button}
            </Modal>
          </View>
        ); 
    }else{
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: 100}}>
          <ActivityIndicator size='large' color='#0000ff'/>
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
    height: 320
  },
  HeaderModal: {
    flex: .15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowRadius: 20,
    width: Dimensions.get('window').width - 60,
    backgroundColor: '#039be5'
  }, 
});

module.exports = EquiposView;