import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack
    screenOptions={{
        headerTransparent: true,
        headerShown: false
    }}
    >
        <Stack.Screen
        name='forgetPassword'
        options= {{}}
        />
        <Stack.Screen
        name='index'
        options= {{}}
        />
        <Stack.Screen
        name='register'
        options= {{}}
        />
    </Stack>
  )
}

export default _layout