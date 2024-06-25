import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const UserLayout = () => {
  return (
    <Stack
    screenOptions={{
      headerTransparent: true,
      headerShown: false
    }}
  >
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="history" options={{ headerShown: false }} />
    <Stack.Screen name="sendMoney" options={{ headerShown: false }} />
    <Stack.Screen name="topUp" options={{ headerShown: false }} />
  </Stack>
  )
}

export default UserLayout