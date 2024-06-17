import React, { createContext, useEffect, useState } from 'react'
import { Stack } from 'expo-router'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
//import { useColorScheme } from 'nativewind'
//import AsyncStorage from '@react-native-async-storage/async-storage'



const LayoutScreen = () => {

// const getData = async () => {
//   try{
//     let mode = await AsyncStorage.getItem("mode")
//     if (!mode){
//       mode = 'light'
//       setTheme(mode)
//     }
//     await AsyncStorage.setItem('mode', mode)
//   }catch(error){
//     throw new Error
//   }
// }

// useEffect(()=> {
//   getData()
// },[])

const {colorScheme} = useColorScheme()

  return (
    <ThemeProvider value={colorScheme === 'dark'? DarkTheme : DefaultTheme}>
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
      </ThemeProvider>
  )
}

export default LayoutScreen