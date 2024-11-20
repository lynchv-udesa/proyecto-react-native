import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import firebase from 'firebase'
import { db, auth } from '../firebase/config'

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
      <View>
        <Text> {this.props.item.data.owner} </Text>
        <Text> {this.props.item.data.username} </Text>
        <Text> {this.props.item.data.post} </Text>
        {
            this.state.like 
            ?
            <TouchableOpacity
            onPress={ () => this.sacarLike(this.props.item.id)}

            >
                <Text> Sacar Like </Text>
            </TouchableOpacity>
            :
            <TouchableOpacity
            onPress={ () => this.darLike(this.props.item.id)}
            >
                <Text> Like </Text>
            </TouchableOpacity>
        }
      </View>
    )
  }
}
