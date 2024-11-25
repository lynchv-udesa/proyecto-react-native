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
            let todosLosUsers = [];

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
        let resultados = this.state.users.filter((elm) => elm.data.username.toLowerCase().includes(text.toLowerCase()))
              console.log(text)
            
            if(resultados.length > 0){
              this.setState({
                resultadosDeBusqueda: resultados, 
                mensaje: `Resultados de búsqueda para ${text}`
            })
            } else {
              this.setState({
                resultadosDeBusqueda: [], 
                mensaje: `No hay resultados de búsqueda para ${text}`
            })
            } 
          } else {
            this.setState({
              resultadosDeBusqueda: [], 
              mensaje: ''
          })
          }      
        
    }

  render() {
    return (
      <View style={styles.screen}>
        <Text style={styles.titulo}>Buscador de Usuarios</Text>
        <Text style={styles.subtitulo}>{this.state.mensaje}</Text>
        <TextInput
            style={styles.input}
            placeholder='Busque un usuario'
            keyboardType='default'
            onChangeText={(text) => this.filtrar(text)}
            value={this.state.buscado}
        />
          <FlatList style={styles.usuarios}
            data={this.state.resultadosDeBusqueda}
            keyExtractor={(item) => item.id.toString()}
            renderItem={ ({item}) =>  <View style={styles.usuario}>
                                        <Text>{item.data.username}</Text>
                                        <Text>{item.data.owner}</Text>
                                      </View>}
          />
        
      </View>
    )
  }
}

let styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center', 
    backgroundColor: '#ffbae4',
  },

  titulo: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    margin: 15,
  },

  subtitulo: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
  },

  input: {
    width: '80%',
    backgroundColor: 'white',
    borderColor: '#ffd8f0',
    borderWidth: 2,
    padding: 5,
    marginBottom: 10,
  },

  usuarios: {
    width: '80%',
    margin: 5,
  },

  usuario: {
    backgroundColor: '#ffd8f0',
    padding: 10,
    margin: 5,
  },
})