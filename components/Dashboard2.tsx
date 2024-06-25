import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons'
import { router } from 'expo-router'
import images from '@/constants/images'


const Dashboard2 = () => {

  return (
    <View className='w-full bg-white rounded-2xl shadow-sm items-center p-5 my-5 bg-[#333]'>
      <View className='w-full flex-row justify-between'>
      <View>
        <Text className='text-[#c0c0c0]'>Current Balance</Text>
        <Text className='text-2xl font-bold text-white'>$319000</Text>
      </View>
      <Image source={images.cardLogo} className='h-[50px] w-[50px] rounded-2xl'/>
      </View>
      <View className='mt-20 w-full'>
        <Text className='text-[#c0c0c0] text-lg text-left'>3121460133</Text>
      </View>
    </View>
  )
}

export default Dashboard2