'use strict'
const Url = 'https://api-net.herokuapp.com/api/Equipos/';
var Peticiones = {
  async Get(){
    return fetch(Url)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
  }
}
module.exports = Peticiones;