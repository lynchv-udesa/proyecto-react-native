import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'

export default class FormularioRegister extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            username: '',
            password: '',
            error: ''
        }
    }

    submit(email, username, password){
        if(!email.includes('@')){
            this.setState({error: 'Ingrese un formato de email válido'})
            return
        }

        if(username.length < 2){
            this.setState({error: 'Ingrese un username de tres o más caracteres'})
            return
        }

        if(password.length < 5){
            this.setState({error: 'Ingrese una contraseña de por lo menos 6 caracteres'})
            return
        }       
        
        auth
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
            if(user){
                db.collection('users').add({
                    owner: auth.currentUser.email,
                    createdAt: Date.now(),
                    bio: '',
                    username: username,
                    imagenPerfil: '',
                })
                .then(
                    () => this.props.navigation.navigate('login')
                )
            }
        })
        .catch(err => {
            if(err.code === "auth/email-already-in-use"){
                this.setState({error: "Este email ya está en uso"})
            }
        })
    }


  render() {
    return (
      <View>
        <Text style={styles.subtitulo}>FormularioRegister</Text>
        <TextInput
            style={styles.input}
            placeholder='Ingrese su correo'
            keyboardType='email-address'
            onChangeText={(text) => this.setState({email: text, error: ''})}
            value={this.state.email}
        />
        <TextInput
            style={styles.input}
            placeholder='Ingrese su username'
            keyboardType='default'
            onChangeText={(text) => this.setState({username: text, error: ''})}
            value={this.state.username}
        />
        <TextInput
            style={styles.input}
            placeholder='Ingrese su password'
            keyboardType='default'
            onChangeText={(text) => this.setState({password: text, error: ''})}
            value={this.state.password}
            secureTextEntry={true}
        />
        {
            this.state.error !== ''
            &&
            <Text>
                {this.state.error}
            </Text>
        }
        { this.state.email !== '' && this.state.username !== '' && this.state.password !== ''
            ?        
            <TouchableOpacity
            onPress={() => this.submit(this.state.email, this.state.username, this.state.password)}
            >
            <Text></Text>
            </TouchableOpacity>
            :
            <Text></Text>
        }
      </View>
    )
  }
}

let styles = StyleSheet.create({
    input: {
        borderWidth: 2,
        padding: 5,
        borderColor: 'green',
        marginBottom: 10
    },
    subtitulo:{
        fontStyle: 'italic',
        padding: 2
      }
})