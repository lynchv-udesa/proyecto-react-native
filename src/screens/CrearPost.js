import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import FormularioPost from '../components/FormularioPost'

export default class CrearPost extends Component {
    constructor(props){
        super(props)
    }

    render() {
    return (
      <View style={styles.screen}>
        <View style={styles.container}>
          <Text style={styles.titulo}> Crear Post </Text>
          <FormularioPost navigation={this.props.navigation}/>
        </View>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center', 
    backgroundColor: '#ffbae4',
  },

  container: {
    justifyContent: 'center',
    alignItems:'center', 
    backgroundColor: 'white',
    borderColor: '#ffd8f0',
    borderWidth: 3,
    borderRadius: 5,
    padding: 15,
    width: '80%',
  },

  titulo: {
    fontWeight: 'bold',
    fontSize: 25,
    margin: 10,
  },
})