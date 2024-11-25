import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import TodosLosPosts from './TodosLosPosts'
import { StyleSheet } from 'react-native'

export default class Inicio extends Component {
  render() {
    return (
      <View style={styles.listPost}>
        <Text>Inicio</Text>
        <Text>{auth.currentUser.email}</Text>
        <TodosLosPosts/> 
      </View>
    )
  }
}
const styles = StyleSheet.create({
  listPost:{
    flex: 1
  }
})