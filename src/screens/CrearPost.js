import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import FormularioPost from '../components/FormularioPost'

export default class CrearPost extends Component {
    constructor(props){
        super(props)
    }
irAInicio(){

}
    render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}> Crear Post </Text>
        <FormularioPost navigation={this.props.navigation}/>
      </View>
    )
  }
}

let styles = StyleSheet.create({
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