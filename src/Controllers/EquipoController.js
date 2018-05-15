'use strict'
const Url = 'https://api-net.herokuapp.com/api/Equipos/';
var Peticiones = {
  async Get(){
    try {
      let response = await fetch(Url);
      let responseJson = await response.json();
      console.log(responseJson.data);
      return responseJson.data;
    } catch (error) {
      return null;
    }
  }
}
module.exports = Peticiones;