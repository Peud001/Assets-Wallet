import { View, Text, Image } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons'
import images from '../constants/images'


const Dashboard1 = () => {
  return (
      <View className='p-5'>
        <View className='flex-row items-center justify-between'>
        <Image
        source={images.user}
        className='w-[50px] h-[50px] rounded-full'
        resizeMode='contain'
        />
        <View className='border rounded-2xl p-2.5 border-[#7B7B7B]'>
        <FontAwesome6  name='bell' color='#fff' size={24}/>
        </View>
        </View>
        <View className='w-full items-center pb-9'>
            <Text className='text-[#c0c0c0] mt-3 text-lg '>Available Balance</Text>
            <Text className='text-white text-5xl mt-3 font-semibold'>$450.54</Text>
        </View>
        </View>
  )
}

export default Dashboard1