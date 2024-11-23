import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { auth, db } from '../firebase/config';

export default class FormularioPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      post: ''
    };
  }

  crearPost() {
    const { username, post } = this.state;

    if (username.length >= 5 && post.length > 0) {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const postData = {
          owner: currentUser.email,
          createdAt: Date.now(),
          post: post,
          username: username
        };
  
        console.log('Datos a guardar:', postData);
  
        db.collection('posts')
          .add(postData)
          .then(() => {
            console.log('Post guardado con éxito');
            this.props.navigation.navigate('HomeTabs', {
              screen: 'Inicio', 
            });
          })
          .catch((err) => console.error('Error al guardar en la base de datos:', err));
      } else {
        console.log('No hay un usuario autenticado.');
      }
    } else {
      console.log('El usuario o el post no cumplen con los requisitos.');
    }
  }

  render() {
    return (
      <View>
        <Text> Crea un Post </Text>
        <View>
          <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder="Ingresa tu usuario"
            onChangeText={(texto) => this.setState({ username: texto })}
            value={this.state.username}
          />
          <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder="¿Qué quieres postear?"
            onChangeText={(texto) => this.setState({ post: texto })}
            value={this.state.post}
          />
          {this.state.username !== '' && this.state.post !== '' ? (
            <TouchableOpacity onPress={() => this.crearPost()}>
              <Text> Postear </Text>
            </TouchableOpacity>
          ) : (
            <Text> Postear </Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5
  }
});
