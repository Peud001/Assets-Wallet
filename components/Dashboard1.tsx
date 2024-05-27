import { View, Text, Image } from 'react-native'
import React from 'react'
import user from '../constants/images'
import { FontAwesome } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'


const Dashboard1 = () => {
  return (
      <View className='p-5'>
        <View className='flex-row items-center justify-between'>
        <Image
        source={user}
        className='w-[50px] h-[50px] rounded-full'
        resizeMode='contain'
        />
        <View className='border-2 rounded-2xl p-2.5 border-[#c0c0c0]'>
        <FontAwesome  name='bell' color='#fff' size={24}/>
        </View>
        </View>
        <View className='w-full items-center'>
            <Text className='text-[#c0c0c0] mt-3 text-lg '>Available Balance</Text>
            <Text className='text-white text-5xl mt-3 font-semibold'>$450.54</Text>
        </View>
        </View>
  )
}

export default Dashboard1