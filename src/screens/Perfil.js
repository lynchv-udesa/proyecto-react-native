import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'

export default class Perfil extends Component {
  constructor(props){
    super(props)
  }

logout(){
  auth.signOut()
}
  
  render() {
    return (
      <View>
        <Text>Perfil</Text>
        <TouchableOpacity
            onPress={() => this.logout()}
        >
            <Text>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    )
  }
}