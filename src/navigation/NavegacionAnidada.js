import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Inicio from '../screens/Inicio'
import Perfil from '../screens/Perfil'
import BuscadorUsuarios from '../screens/BuscadorUsuarios'
import CrearPost from '../screens/CrearPost'

import FontAwesome from '@expo/vector-icons/FontAwesome';


const Tab = createBottomTabNavigator()

export default class NavegacionAnidada extends Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen name='Home' component={Inicio} 
            options={{headerShown: false,
                        tabBarIcon: () => <FontAwesome name="home" size={24} color="#ffbae4" />,
            }} />
        <Tab.Screen name='Buscador' component={BuscadorUsuarios} 
            options={{headerShown: false, 
                        tabBarIcon: () => <FontAwesome name="search" size={24} color="#ffbae4" />,
            }} />
        <Tab.Screen name='Post' component={CrearPost} 
            options={{headerShown: false, 
                        tabBarIcon: () => <FontAwesome name="plus-square-o" size={24} color="#ffbae4" />,
            }} />
        <Tab.Screen name='Perfil' component={Perfil} 
            options={{headerShown: false, 
                        tabBarIcon: () => <FontAwesome name="user" size={24} color="#ffbae4" />,
            }} />
      </Tab.Navigator>
    )
  }
}