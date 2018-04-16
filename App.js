import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Equipos from './src/Views/EquiposView';
import Jugadores from './src/Views/JugadoresView';

var Main = TabNavigator({
    Tab1 : {screen : Equipos},
    Tab2 : {screen : Jugadores}
},{
  tabBarPosition : 'bottom',
  swipeEnabled : true
});

Main.navigationOptions = {
  title : 'Tabs'
};

export default Main;
