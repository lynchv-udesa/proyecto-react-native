import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import firebase from 'firebase'
import { db, auth } from '../firebase/config'
import { AntDesign } from '@expo/vector-icons';

export default class Posts extends Component {
    constructor(props){
        super(props)
        this.state = {
            like: false
        }
    }
    darLike(idDocumento){
        db
        .collection('posts')
        .doc(idDocumento)
        .update({
            arrLikes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then( () => {
            this.setState({
                like: true
            })
        })
    }
    sacarLike(idDocumento){
        db
        .collection('posts')
        .doc(idDocumento)
        .update({
            arrLikes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then( () => {
            this.setState({
                like: false
            })
        })
    }

    render() {
    return (
      <View style={styles.container}>
        
        <Text style={styles.owner}> {this.props.item.data.owner} </Text>
        <Text style={styles.content}> {this.props.item.data.username} </Text>
        <Text style={styles.content}> {this.props.item.data.post} </Text>
        
        {
            this.state.like 
            ?
            <TouchableOpacity
            onPress={ () => this.sacarLike(this.props.item.id)}
            style={styles.heartButton}
            >
                <AntDesign name="heart" size={30} color="red" />

            </TouchableOpacity>
            :
            <TouchableOpacity
            onPress={ () => this.darLike(this.props.item.id)}
            style={styles.heartButton}
            >
                <AntDesign name="hearto" size={30} color="gray" />
            </TouchableOpacity>
        }

      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
    },
    owner: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    content: {
        fontSize: 14,
        marginBottom: 10,
    },
    heartButton: {
        alignSelf: 'flex-start',
        marginTop: 10,
    },
});