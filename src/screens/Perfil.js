import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import Posts from '../components/Posts'
import { FlatList } from 'react-native-web'
import { StyleSheet } from 'react-native'

export default class Perfil extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: []
    }
  }

  componentDidMount() {
    db
      .collection('users')
      .where('owner', '==', auth.currentUser.email)
      .onSnapshot(docs => {
        let arrDocs = []

        docs.forEach(
          (doc) => {
            arrDocs.push({
              id: doc.id,
              data: doc.data()
            })
          }
        )

        this.setState({
          userInfo: arrDocs
        }, () => console.log('Mi estado', this.state))

      })
    db
      .collection('posts')
      .where('owner', '==', auth.currentUser.email)
      .onSnapshot(docs => {
        let arrDocs = []

        docs.forEach(
          (doc) => {
            arrDocs.push({
              id: doc.id,
              data: doc.data()
            })
          }
        )

        this.setState({
          userPostsInfo: arrDocs
        }, () => console.log('Mi estado posts', this.state))

      })
  }

  logout(){
    auth.signOut()
  }

  render() {
    return (
      <View style={styles.screen}>
        
        {
          this.state.userInfo.length > 0
            ?
            <Text style={styles.usuario}>{this.state.userInfo[0].data.username}{'\n'}{this.state.userInfo[0].data.owner}</Text>
            :
            null
        }

        <TouchableOpacity style={styles.baseLogout}
          onPress={() => this.logout()} >
          <Text style={styles.logout}>Cerrar Sesión</Text>
        </TouchableOpacity>

        <View style={styles.container}>
            <Text style={styles.subtitulo}>Mis posteos</Text>
            <FlatList
                data={this.state.userPostsInfo}
                keyExtractor={ (item) => item.id.toString()}
                renderItem={ ({item}) => <Posts item={item} />}
            />
        </View>  
      </View>
    )
  }
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center', 
    backgroundColor: '#ffbae4',
  },

  usuario: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    width: '90%', 
    textAlign: 'right',
    margin: 5,
  },

  baseLogout: {
    width: '90%', 
    margin: 5,
  },

  logout: {
    color: '#ffecf8', 
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'right',
  },

  container:{
    flex: 2,
    width: '90%',
  },

  subtitulo: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    margin: 10,
  },
})