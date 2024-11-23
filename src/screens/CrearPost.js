import React, { Component } from 'react'
import { Text, View } from 'react-native'
import FormularioPost from '../components/FormularioPost'

export default class CrearPost extends Component {
    constructor(props){
        super(props)
    }

    render() {
    return (
      <View>
        <Text> Crear Post </Text>
        <FormularioPost/>
      </View>
    )
  }
}
