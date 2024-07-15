import { TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather} from '@expo/vector-icons'
import images from '../constants/images'
import { useColorScheme } from 'nativewind'
import ThemeToggle from './ThemeToggle'
import { Text, View } from './Themed'


const Dashboard1 = () => {

  const {colorScheme, toggleColorScheme} = useColorScheme()
  console.log(colorScheme)

  return (
        <View className='flex-row items-center justify-between'>
        <View>
          <Text className='text-lg text-gray-500'>Welcome back</Text>
          <Text className='text-2xl font-bold'>Solomon Udofia</Text>
        </View>
        <View className='flex-row items-center'>
          <ThemeToggle/>
        <TouchableOpacity className='pl-5'>
        <Feather name='bell' size={26} color={`${colorScheme==='light'? '#333' : '#c0c0c0'}`}/>
        </TouchableOpacity>
        </View>
        </View>
  )
}

export default Dashboard1