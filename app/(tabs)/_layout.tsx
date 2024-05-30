import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome6 } from '@expo/vector-icons'
import { Foundation } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const _layout = () => {
  return (
    <Tabs
    screenOptions={{
      tabBarShowLabel: false,
      tabBarActiveTintColor : '#7D29F6',
      tabBarInactiveTintColor: '#CDCDE0',
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#fff',
        height: 70
      }
    }}
    >
        <Tabs.Screen
        name='home'
        options={{
          tabBarIcon: ({color}) => <Foundation name="home" size={28} color={color} />
        }}
        />
        <Tabs.Screen
        name='statistics'
        options={{
          tabBarIcon: ({color}) => <MaterialIcons name="insert-chart" size={28} color={color} />
        }}
        />
        <Tabs.Screen
        name='contact'
        options={{
          tabBarIcon: ({color}) => <MaterialIcons name="contact-page" size={28} color={color} />
        }}
        />
        <Tabs.Screen
        name='profile'
        options={{
          tabBarIcon: ({color}) => <FontAwesome6 name="user" size={28} color={color} />
        }}
        />
    </Tabs>
  )
}

export default _layout