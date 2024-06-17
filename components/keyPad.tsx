import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons'

interface pressType {
    onPress: ()=>void
}


const KeyPad = ({onPress}: pressType) => {

  return (
    <ScrollView className='px-5 bg-white h-full'>
       <View className='flex-row justify-between max-w-[680px] mb-10'>
       <TouchableOpacity onPress={onPress} className='w-12 h-12 items-center justify-center '>
      <Text className='text-2xl text-gray-500'>9</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onPress} className='w-12 h-12 items-center justify-center '>
      <Text className='text-2xl text-gray-500'>8</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onPress} className='w-12 h-12 items-center justify-center '>
      <Text className='text-2xl text-gray-500'>7</Text>
    </TouchableOpacity>
       </View>
       <View className='flex-row justify-between max-w-[680px] mb-10'>
       <TouchableOpacity onPress={onPress} className='w-12 h-12 items-center justify-center '>
      <Text className='text-2xl text-gray-500'>6</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onPress} className='w-12 h-12 items-center justify-center '>
      <Text className='text-2xl text-gray-500'>5</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onPress} className='w-12 h-12 items-center justify-center '>
      <Text className='text-2xl text-gray-500'>4</Text>
    </TouchableOpacity>
       </View>
       <View className='flex-row justify-between max-w-[680px] mb-10'>
       <TouchableOpacity onPress={onPress} className='w-12 h-12 items-center justify-center '>
      <Text className='text-2xl text-gray-500'>3</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onPress} className='w-12 h-12 items-center justify-center '>
      <Text className='text-2xl text-gray-500'>2</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onPress} className='w-12 h-12 items-center justify-center '>
      <Text className='text-2xl text-gray-500'>1</Text>
    </TouchableOpacity>
       </View>
       <View className='flex-row justify-between max-w-[680px] mb-10'>
       <TouchableOpacity onPress={onPress} className='w-12 h-12 items-center justify-center '>
      <Text className='text-2xl text-gray-500'>.</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onPress} className='w-12 h-12 items-center justify-center '>
      <Text className='text-2xl text-gray-500'>0</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onPress} className='w-12 h-12 items-center justify-center '>
      <FontAwesome6 name='delete-left' size={22}/> 
    </TouchableOpacity>
       </View>
    </ScrollView>
  )
}

export default KeyPad