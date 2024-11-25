import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
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
      <View style={styles.screen}>
        <View style={styles.container}>
          <Image source={require('../../assets/img/logomiautter1.png')} style={styles.image} resizeMode='contain' />
          <Text style={styles.titulo}>Login</Text>
          <FormularioLogin navigation={this.props.navigation} />
          <Text>¿No estás registrado?</Text>
          <TouchableOpacity onPress={() => this.irARegister()}>
              <Text style={styles.ir}>Registrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center', 
    backgroundColor: 'white',
  },

  image: {
    width: '50%',
    height: 120,
    padding: 0,
  },

  container: {
    justifyContent: 'center',
    alignItems:'center', 
    backgroundColor: '#ffd8f0',
    borderColor: '#ffbae4',
    borderWidth: 3,
    borderRadius: 5,
    width: '60%',
  },

  titulo: {
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 5,
  },

  ir: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  }
})