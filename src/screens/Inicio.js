import { Text, View, Image, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import TodosLosPosts from './TodosLosPosts'

export default class Inicio extends Component {
  render() {
    return (
      <View style={styles.screen}>
        <Text style={styles.usuario}>{auth.currentUser.email}</Text>
        <Text style={styles.titulo}>Miautter</Text>
        <Image source={require('../../assets/img/logomiautter1.png')} style={styles.image} resizeMode='contain' />  
        <TodosLosPosts/> 
      </View>
    )
  }
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center', 
    backgroundColor: '#ffbae4',
  },

  usuario: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    width: '90%', 
    textAlign: 'right',
    margin: 5,
  },

  titulo: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    margin: 15,
  },

  image: {
    width: '50%',
    height: 120,
    padding: 0,
    marginBottom: 5,
  },
})