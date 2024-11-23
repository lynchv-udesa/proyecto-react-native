import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
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
      <View style={styles.container}>
        <Text style={styles.titulo}>Register</Text>
        <FormularioRegister navigation={this.props.navigation} />
        <Text>¿Ya estás registrado?</Text>
        <TouchableOpacity onPress={() => this.irALogin()}>
            <Text style={styles.titulo}>Logueate</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 3,
    borderRadius: 5,
    alignItems:'center',
    backgroundColor: 'beige'
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
})