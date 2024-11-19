import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { auth } from "../firebase/config"

export default class FormularioPost extends Component {
    contructor(props){
        super(props)
        this.state = {
            username: '',
            post: ''
        }
    }
    crearPost(){
        if(
            this.state.username.length >= 5 
            &&
            this.state.post.length !== ''
        ){
            auth
            .createUserWithEmailAndPassword(this.state.username, this.state.post)
            .then((user) => {
                this.props.navigation.navigate('Inicio')
            })
            .catch(err => console.log('hubo un error en la base de datos', err))

            auth
            .signInWithEmailAndPassword(this.state.username, this.state.post)
            .then((user) => {

            })
            .catch(err => console.log('hubo un error en la base de datos', err))
        }
    }
    render() {
    return (
      <View>
        <Text> Crea un Post </Text>
        <View>
            <TextInput
                style = {styles.input}
                keyboardType='default'
                placeholder='Ingresa tu usuario'
                onChangeText={(texto) => this.setState({username: texto})}
                value={this.state.username}
            />
            <TextInput
                style = {styles.input}
                keyboardType='default'
                placeholder='Que queres postear?'
                onChangeText={(texto) => this.setState({post: texto})}
                value={this.state.post}
            />
            <TouchableOpacity
                onPress={() => this.crearPost()}
            > 
                <Text>
                    Postear
                </Text>
            </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    input: {

    }
})