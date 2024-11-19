import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import FormularioRegister from '../components/FormularioRegister'

export default class Register extends Component {
    constructor(props){
        super(props)
    }

    irALogin(){
        this.props.navigation.navigate('login')
    }

  render() {
    return (
      <View>
        <Text>Register</Text>
        <FormularioRegister navigation={this.props.navigation} />
        <TouchableOpacity onPress={() => this.irALogin()}>
            <Text>¿Ya estás registrado? Logueate</Text>
        </TouchableOpacity>
      </View>
    )
  }
}