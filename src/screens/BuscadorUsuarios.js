import { Text, View, FlatList, StyleSheet, TextInput } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'

export default class BuscadorUsuarios extends Component {
    constructor(props){
        super(props)
        this.state = {
            users: [],
            buscado: '', 
            resultadosDeBusqueda: [],
            mensaje: ''
        }
    }

    componentDidMount(){
        db.collection('users').onSnapshot((docs) => {
            let todosLosUsers = []

            docs.forEach((doc) => todosLosUsers.push({
                id: doc.id,
                data: doc.data()
            }))

            this.setState({
                users: todosLosUsers
            })
        })
    }

    filtrar(text) {
      this.setState({ buscado: text })

      if(text !== ''){
        let resultados = this.state.users.filter((elm) => elm.data.username.includes(text))
              console.log(text)
            
            { resultados.length > 0
              ?
                this.setState({
                    resultadosDeBusqueda: resultados, 
                    mensaje: `Resultados de búsqueda para ${this.state.buscado}`
                })
              :
                this.setState({
                    mensaje: `No hay resultados de búsqueda para ${this.state.buscado}`
                })
            }       
        }
    }

  render() {
    return (
      <View>
        <Text>{this.state.mensaje}</Text>
        <TextInput
            style={styles.input}
            placeholder='Busque un usuario'
            keyboardType='default'
            onChangeText={(text) => this.filtrar(text)}
            value={this.state.buscado}
        />
          <FlatList 
            data={this.state.resultadosDeBusqueda}
            keyExtractor={(item) => item.id.toString()}
            renderItem={ ({item}) => <Text>{item.data.username}</Text>}
          />
        
      </View>
    )
  }
}

let styles = StyleSheet.create({
  input: {
      borderWidth: 1,
      borderColor: 'green',
      marginBottom: 10
  }
})