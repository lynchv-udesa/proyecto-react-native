import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'

export default class FormularioLogin extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            error: '',
            recordar: false
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

    submit(email, password){
        if(!email.includes('@')){
            this.setState({error: 'Ingrese un formato de email válido'})
            return
        }  

        if(password.length < 1){
            this.setState({error: 'Debe ingresar una contraseña'})
            return
        }    
        
        auth
        .signInWithEmailAndPassword(email, password)
        .then(() => this.props.navigation.navigate('anidada') )
        .catch((err) => {
            console.log('error sin parsear', err)
            const error = JSON.parse(err.message)
            console.log('error parseado', error)
            if(error.error.message === 'INVALID_LOGIN_CREDENTIALS'){ // Si pongo un mail valido pero la contraseña incorrecta, me sigue diciendo que el email no está registrado
                this.setState({error: "El email o la contraseña no son correctos"}) // Me tira el mismo error ('INVALID_LOGIN_CREDENTIALS') para ambos casos. 
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
            { this.state.email !== '' && this.state.password !== ''
                ?        
                <TouchableOpacity style={styles.baseBoton}
                onPress={() => this.submit(this.state.email, this.state.password)}
                >
                <Text style={styles.boton}>Login</Text>
                </TouchableOpacity>
                :
                <Text style={styles.noboton}>Login</Text>
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