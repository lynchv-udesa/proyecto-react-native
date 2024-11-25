import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'
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

    componentDidMount(){
        auth
        .onAuthStateChanged(user => {
            if(user){
                this.props.navigation.navigate('anidada')
            } 
        })
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
      <View style={styles.container}>
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
                <Text style={styles.error}>
                    {this.state.error}
                </Text>
            }
            { this.state.email !== '' && this.state.username !== '' && this.state.password !== ''
                ?        
                <TouchableOpacity style={styles.baseBoton}
                onPress={() => this.submit(this.state.email, this.state.username, this.state.password)}
                >
                <Text style={styles.boton}>Register</Text>
                </TouchableOpacity>
                :
                <Text style={styles.noboton}>Register</Text>
            }
      </View>
    )
  }
}

let styles = StyleSheet.create({
    container: {
        width: '90%',
        justifyContent: 'center',
        width: '90%',
        alignItems: 'center',
        padding: 5, 
        margin: 5,
    },

    input: {
        width: '90%',
        backgroundColor: 'white',
        borderColor: '#ffbae4',
        borderWidth: 2,
        padding: 5,
        marginBottom: 10,
    },

    baseBoton: {
        width: '70%',
        borderWidth: 2,
        padding: 5,
        marginBottom: 10,
        textAlign: 'center',
        backgroundColor: '#ffbae4',
        borderColor: 'white',
    },

    boton:{
        textAlign: 'center',
    },

    noboton:{
        width: '70%',
        textAlign: 'center',
        backgroundColor: '#ccc',
        borderColor: 'white',
        borderWidth: 2,
        padding: 5,
        marginBottom: 10,
    },

    error: {
        color: 'red',
        marginBottom: 10, 
        textAlign: 'center',
    }
})