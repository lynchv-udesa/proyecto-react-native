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
      .orderBy('createdAt', 'desc')
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
  logout() {
    auth.signOut()
  }

  render() {
    return (
      <View style={styles.listPost}>
        <Text>Perfil</Text>

        {
          this.state.userInfo.length > 0
            ?
            <Text>{this.state.userInfo[0].data.username}</Text>
            :
            ''
        }

        <FlatList
            data={this.state.userPostsInfo}
            keyExtractor={ (item) => item.id.toString()}
            renderItem={ ({item}) => <Posts item={item} />}
        />

        <TouchableOpacity
          onPress={() => this.logout()}
        >
          <Text>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  listPost:{
    flex: 1
  }
})