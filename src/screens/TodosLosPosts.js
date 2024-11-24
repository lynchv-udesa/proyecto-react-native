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
      <View style={styles.listPost}>
        <Text> Posts </Text>
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
    listPost:{
      flex: 1
    }
  })