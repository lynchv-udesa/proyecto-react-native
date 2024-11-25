import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { db, auth } from '../firebase/config'
import Posts from '../components/Posts'
import { FlatList } from 'react-native-web'
import { StyleSheet } from 'react-native'

export default class TodosLosPosts extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            todosLosPosts: []
        }
    }

    componentDidMount(){
        db
        .collection('posts')
        .orderBy('createdAt', 'desc')
        .onSnapshot( docs => {
            let arrDocs = []
            docs.forEach( (doc) => {
                arrDocs.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                todosLosPosts: arrDocs
            }, () => console.log('state posts', this.state))
        })
    }
    
    render() {
    return (
      <View style={styles.container}>
        <Text style={styles.subtitulo}>Todos los posteos</Text>
        <FlatList
            data={this.state.todosLosPosts}
            keyExtractor={ (item) => item.id.toString()}
            renderItem={ ({item}) => <Posts item={item} />}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
    container:{
      flex: 1,
      width: '90%',
    },

    subtitulo: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 17,
      margin: 10,
    },
  })