import { Text, View, TouchableOpacity, StyleSheet} from 'react-native'
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
      <View style={styles.container}>
        <Text style={styles.titulo}>Login</Text>
        <FormularioLogin navigation={this.props.navigation} />
        <Text>¿No estás registrado?</Text>
        <TouchableOpacity onPress={() => this.irARegister()}>
            <Text style={styles.titulo}>Registrate</Text>
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