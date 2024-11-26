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

    componentDidMount(){
        {
            this.props.item.data.arrLikes.includes(auth.currentUser.email)
            ?
            this.setState({
                like: true
            })
            :
            ""
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
    eliminar(idDocumento){
        db
        .collection('posts')
        .doc(idDocumento)
        .delete()
        .then( () => 
            console.log('Post eliminado')
        )
        .catch((err) => console.error('Error al eliminar post:', err));
    }


    render() {
        const fechaDelPost = new Date(this.props.item.data.createdAt)
        console.log(fechaDelPost)
        console.log(this.props.item.data.arrLikes.length)
        const fecha = fechaDelPost.toLocaleDateString()
    return (
      <View style={styles.container}>
        
        <Text style={styles.owner}> {this.props.item.data.owner} </Text>
        <Text style={styles.content}> {this.props.item.data.post} </Text>
        <Text style={styles.info}> {fecha} </Text>
        
        {
            this.props.item.data.arrLikes.length > 0
            ?
            <Text style={styles.info}> Cantidad de likes: {this.props.item.data.arrLikes.length} </Text>
            :
            <Text style={styles.info}> Cantidad de likes: 0 </Text>
        }

        {
            this.state.like 
            ?
                <TouchableOpacity style={styles.heartButton}
                    onPress={ () => this.sacarLike(this.props.item.id)} >
                    
                    <AntDesign name="heart" size={30} color="#ffbae4" />

                </TouchableOpacity>
            :
                <TouchableOpacity style={styles.heartButton}
                    onPress={ () => this.darLike(this.props.item.id)} >
                        
                    <AntDesign name="hearto" size={30} color="#ffbae4" />

                </TouchableOpacity>
        }
           {
            auth.currentUser.email === this.props.item.data.owner
            ?
            <TouchableOpacity style={styles.heartButton}
                    onPress={ () => this.eliminar(this.props.item.id)} >
                        
                    <Text style={styles.eliminar}>Eliminar posteo</Text>

            </TouchableOpacity>
            :
            null
        }


      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderColor: '#ffd8f0',
        borderWidth: 3,
        borderRadius: 5,
        margin: 5,
        padding: 10,
    },

    owner: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 2,
    },

    content: {
        fontSize: 17,
        marginBottom: 10,
    },

    info: {
        fontSize: 12,
        marginBottom: 5,
    },

    heartButton: {
        alignSelf: 'flex-start',
        margin: 10,
    },
});