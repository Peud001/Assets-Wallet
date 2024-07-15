import {TouchableOpacity} from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { useColorScheme } from 'nativewind'

const ThemeToggle = () => {

    const {colorScheme, toggleColorScheme} = useColorScheme()

  return (
    <TouchableOpacity onPress={toggleColorScheme}>
        <Feather name={colorScheme === 'light'? 'moon' : 'sun'} size={26} color={`${colorScheme==='light'? '#333' : '#c0c0c0'}`} />
    </TouchableOpacity>
  )
}

export default ThemeToggle