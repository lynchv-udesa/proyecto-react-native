import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'

export default class Inicio extends Component {
  render() {
    return (
      <View>
        <Text>Inicio</Text>
        <Text>{auth.currentUser.email}</Text>
      </View>
    )
  }
}