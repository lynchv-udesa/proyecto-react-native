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
  
  publicado(){
    this.setState({post: '', error: ''});
    console.log('Posteo publicado');
    this.props.navigation.navigate('Inicio')
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
          this.publicado
        })
        .catch((err) => console.error('Error al guardar en la base de datos:', err));
    } else {
      this.setState({error: "Debes estar logueado"});
    }
    
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>

          <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder="¿Qué quieres postear?"
            onChangeText={(texto) => this.setState({ post: texto, error: '' })}
            value={this.state.post}
          />

          {this.state.error !== '' && this.state.post !== '' 
            ? 
              <TouchableOpacity onPress={() => this.submit(this.state.post)}>
                <Text style={styles.button}> Postear </Text>
              </TouchableOpacity>
            : 
              <Text> Postear </Text>
          }

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
