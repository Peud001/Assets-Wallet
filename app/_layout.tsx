import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'

const LayoutScreen = () => {
  return (
    <SafeAreaView>
      <Stack>
        <Stack.Screen
        name='index'
        options={{
        }}
        />
        <Stack.Screen
        name='(tabs)'
        options={{}}
        />
      </Stack>
    </SafeAreaView>
  )
}

export default LayoutScreen