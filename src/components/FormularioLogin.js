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
            } else {
                this.props.navigation.navigate('login')
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
                this.setState({error: "Este email no está registrado"})
            }
        })
    }

  render() {
    return (
      <View>
        <Text>FormularioLogin</Text>
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
            <Text>
                {this.state.error}
            </Text>
        }
        <TouchableOpacity
            onPress={() => this.submit(this.state.email, this.state.password)}
        >
            <Text>Login</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

let styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: 'green',
        marginBottom: 10
    }
})