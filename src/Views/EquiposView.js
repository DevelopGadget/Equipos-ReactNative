'use strict'
import React from 'react';
import { StyleSheet, Text, View, Alert, Navigator, Image, ScrollView, Dimensions, ActivityIndicator, YellowBox } from 'react-native';
import { Button, Card, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TabNavigator } from 'react-navigation';

import EquiposCont from '../Controllers/EquipoController';
const hola = 'hopl';
export default class EquiposView extends React.Component {
  constructor(props){
    super(props);
    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
    ]);
    this.state ={ isLoading: false, Equipos: [], Backup: []}
  }
  componentDidMount(){
    EquiposCont.Get().then((res) =>{
      this.ChangeState(true, res, res);
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
  ChangeState(Load, Equipos, Backup){
    this.setState({
      isLoading: Load,
      Equipos: Equipos,
      Backup: Backup,
    }, function(){});
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
                  onChangeText={(Text) => this.ChangeState(true, this.state.Backup.filter(item => {return item.sNombre.match(Text.toUpperCase())}), this.state.Backup)}
                placeholder='Buscar' />
              </View>
              <View style={{flex: 1, marginTop: 30,}}>
                <Button raised icon={{ name: 'plus-circle', type: 'font-awesome'}} title='Añadir' buttonStyle={styles.Boton}/>
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
                      <Button large icon={{ name: 'eye', type: 'font-awesome'}}
                        backgroundColor='#03A9F4'
                        onPress={() => Alert.alert('Alert Title',Equipo.Id,[{text: 'OK'}],{ cancelable: false })}
                        buttonStyle={{borderRadius: 20, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                      title='Ver Equipo' />
                    </Card>
                  );
                })
              }
            </View>
          </ScrollView>
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
});

module.exports = EquiposView;