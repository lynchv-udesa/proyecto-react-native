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
    marginTop: 150,
    justifyContent: 'center',
    alignSelf: 'center', 
    borderColor: '#ccc',
    borderWidth: 3,
    borderRadius: 5,
    alignItems:'center',
    backgroundColor: 'beige',
    width: 500,
    height: 400
    
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
})