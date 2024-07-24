import { Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather, MaterialIcons} from '@expo/vector-icons'
import images from '../constants/images'
import { useColorScheme } from 'nativewind'
import ThemeToggle from './ThemeToggle'
import { Text, View } from './Themed'


const Dashboard1 = () => {

  const {colorScheme} = useColorScheme()
  
  return (
        <View className='flex-row items-center justify-between'>
          <View>
            <Image
            source={images.user}
            className='w-[30px] h-[30px] mb-2 rounded-full'
            />
          <View className='flex-row items-center gap-2'>
          <Text className='text-xl font-pmedium'>Hello</Text>
          <Text className='text-xl font-pbold'>Solomon</Text>
          <MaterialIcons name="waving-hand" size={20} color='#BF9765' />
          </View>
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