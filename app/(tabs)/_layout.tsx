import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'

const _layout = () => {
  return (
    <Tabs
    screenOptions={{
      tabBarShowLabel: false,
      tabBarActiveTintColor : '#FFA001',
      tabBarInactiveTintColor: '#CDCDE0',
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#282A36',
        height: 70
      }
    }}
    >
        <Tabs.Screen
        name='home'
        options={{
          tabBarIcon: ({color}) => <FontAwesome size={24} name='home' color={color} />
        }}
        />
        <Tabs.Screen
        name='statistics'
        options={{
          tabBarIcon: ({color}) => <FontAwesome size={24} name='bar-chart' color={color}/>
        }}
        />
        <Tabs.Screen
        name='contact'
        options={{
          tabBarIcon: ({color}) => <FontAwesome size={24} name='history' color={color}/>
        }}
        />
        <Tabs.Screen
        name='profile'
        options={{
          tabBarIcon: ({color}) => <FontAwesome size={24} name='user' color={color}/>
        }}
        />
    </Tabs>
  )
}

export default _layout