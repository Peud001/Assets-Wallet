import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'
import { FontAwesome6 } from '@expo/vector-icons'



const LayoutScreen = () => {
  return (
      <Stack 
      screenOptions={{
        headerTransparent: true
      }}
      >
        <Stack.Screen
        name='index'
        options={{
          headerShown: false
        }}
        />
        <Stack.Screen
        name='(tabs)'
        options={{
          headerShown: false
        }}
        />
        <Stack.Screen
        name='sendMoney'
        options={{
          headerShown: false
          // headerTitle: 'Send Money',
          // headerTitleStyle: {
          //   fontWeight: 'bold',
          // },
          // headerTintColor: '#fff',
          // headerTitleAlign: 'center',
        }}
        />
      </Stack>
      
  )
}

export default LayoutScreen