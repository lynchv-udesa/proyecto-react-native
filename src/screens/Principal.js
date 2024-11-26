import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'

export default class Login extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        auth
        .onAuthStateChanged(user => {
            if(user){
                this.props.navigation.navigate('anidada')
            } 
        })
    }

    irARegister(){
        this.props.navigation.navigate('register')
    }

    irALogin(){
        this.props.navigation.navigate('login')
    }

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.container}>
          <Image source={require('../../assets/img/logomiautter1.png')} style={styles.image} resizeMode='contain' />
          <Text style={styles.titulo}>Miautter</Text>
          <Text>¿Estás registrado?</Text>
          <TouchableOpacity onPress={() => this.irALogin()}>
              <Text style={styles.ir}>Logueate</Text>
          </TouchableOpacity>
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
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 20,
  },

  image: {
    width: '80%',
    height: 120,
    marginTop: 15,
  },

  ir: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 15,
  }
})