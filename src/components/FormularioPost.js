import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { auth, db } from '../firebase/config';

export default class FormularioPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: '',
      error: ''
    };
  }

  submit(post) {
    if(post.length === 0){
      this.setState({error: 'Debe completar el campo'});
      return
    }
    if(post.length < 3){
      this.setState({error: 'Debe contener mas de 3 caracteres'});
      return
    }

    const user = auth.currentUser;

    if (user) {
      const postData = {
        owner: user.email,
        createdAt: Date.now(),
        post: post,
        arrLikes: []
      };

      console.log('Datos a guardar:', postData);

      db.collection('posts')
        .add(postData)
        .then(() => {
          this.props.navigation.navigate('Inicio');
          this.setState({post: '', error: ''})
        })
        .catch((err) => console.error('Error al guardar en la base de datos:', err));
    
      } else {
          this.setState({error: "Debes estar logueado"});
      }
    
  }

  render() {
    return (
      <View style={styles.container}>
          <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder="¿Qué quieres postear?"
            onChangeText={(texto) => this.setState({ post: texto, error: '' })}
            value={this.state.post}
          />
          {
                this.state.error !== ''
                &&
                <Text style={styles.error}>
                    {this.state.error}
                </Text>
          }
          {this.state.error == '' && this.state.post !== '' 
            ? 
              <TouchableOpacity style={styles.baseBoton}
                onPress={() => this.submit(this.state.post)}>
                <Text style={styles.boton}> Postear </Text>
              </TouchableOpacity>
            : 
              <Text style={styles.noboton}> Postear </Text>
          }
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
        backgroundColor: '#ffd8f0',
        borderColor: '#ffbae4',
        borderWidth: 2,
        padding: 5,
        margin: 10,
    },

    baseBoton: {
        width: '70%',
        borderWidth: 2,
        padding: 5,
        margin: 10,
        textAlign: 'center',
        backgroundColor: '#ffbae4',
        borderColor: '#ffd8f0',
    },

    boton:{
        textAlign: 'center',
    },

    noboton:{
        width: '70%',
        textAlign: 'center',
        backgroundColor: '#ccc',
        borderColor: '#eee',
        borderWidth: 2,
        padding: 5,
        margin: 10,
    },

    error: {
        color: 'red',
        marginBottom: 10, 
        textAlign: 'center',
    }
});
