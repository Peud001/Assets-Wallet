import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather} from '@expo/vector-icons'
import images from '../constants/images'
import { useColorScheme } from 'nativewind'


const Dashboard1 = () => {

  const {colorScheme, toggleColorScheme} = useColorScheme()
  console.log(colorScheme)

  return (
        <View className='flex-row items-center justify-between'>
        <View>
          <Text className='text-lg text-gray-500'>Welcome back</Text>
          <Text className='text-2xl font-bold'>Solomon Udofia</Text>
        </View>
        <TouchableOpacity>
        <Feather name='bell' size={28}/>
        </TouchableOpacity>
        </View>
  )
}

export default Dashboard1