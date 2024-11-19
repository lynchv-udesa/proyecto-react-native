import { Text, View, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import FormularioLogin from '../components/FormularioLogin'

export default class Login extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log('Props de la screen', this.props)
    }

    irARegister(){
        this.props.navigation.navigate('register')
    }

  render() {
    return (
      <View>
        <Text>Login</Text>
        <FormularioLogin navigation={this.props.navigation} />
        <TouchableOpacity onPress={() => this.irARegister()}>
            <Text>¿No estás registrado? Registrate</Text>
        </TouchableOpacity>
      </View>
    )
  }
}