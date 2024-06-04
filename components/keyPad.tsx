import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons'

const KeyPad = () => {

    interface pressType {
        onPress: ()=>void
    }

    const handlePress = ({onPress}: pressType) => {}

  return (
    <ScrollView className='px-5 bg-white h-full'>
       <View className='flex-row justify-between max-w-[680px] mb-10'>
       <TouchableOpacity className='bg-slate-200 text-black w-12 h-12 items-center justify-center rounded-full'>
      <Text className='text-2xl'>9</Text>
    </TouchableOpacity>
    <TouchableOpacity className='bg-slate-200 text-black w-12 h-12 items-center justify-center rounded-full'>
      <Text className='text-2xl'>8</Text>
    </TouchableOpacity>
    <TouchableOpacity className='bg-slate-200 text-black w-12 h-12 items-center justify-center rounded-full'>
      <Text className='text-2xl'>7</Text>
    </TouchableOpacity>
       </View>
       <View className='flex-row justify-between max-w-[680px] mb-10'>
       <TouchableOpacity className='bg-slate-200 text-black w-12 h-12 items-center justify-center rounded-full'>
      <Text className='text-2xl'>6</Text>
    </TouchableOpacity>
    <TouchableOpacity className='bg-slate-200 text-black w-12 h-12 items-center justify-center rounded-full'>
      <Text className='text-2xl'>10</Text>
    </TouchableOpacity>
    <TouchableOpacity className='bg-slate-200 text-black w-12 h-12 items-center justify-center rounded-full'>
      <Text className='text-2xl'>4</Text>
    </TouchableOpacity>
       </View>
       <View className='flex-row justify-between max-w-[680px] mb-10'>
       <TouchableOpacity className='bg-slate-200 text-black w-12 h-12 items-center justify-center rounded-full'>
      <Text className='text-2xl'>10</Text>
    </TouchableOpacity>
    <TouchableOpacity className='bg-slate-200 text-black w-12 h-12 items-center justify-center rounded-full'>
      <Text className='text-2xl'>2</Text>
    </TouchableOpacity>
    <TouchableOpacity className='bg-slate-200 text-black w-12 h-12 items-center justify-center rounded-full'>
      <Text className='text-2xl'>1</Text>
    </TouchableOpacity>
       </View>
       <View className='flex-row justify-between max-w-[680px] mb-10'>
       <TouchableOpacity className='bg-slate-200 text-black w-12 h-12 items-center justify-center rounded-full'>
      <Text className='text-2xl'>.</Text>
    </TouchableOpacity>
    <TouchableOpacity className='bg-slate-200 text-black w-12 h-12 items-center justify-center rounded-full'>
      <Text className='text-2xl'>0</Text>
    </TouchableOpacity>
    <TouchableOpacity className='bg-slate-200 text-black w-12 h-12 items-center justify-center rounded-full'>
      <Text><FontAwesome6 name='delete-left' size={22}/> </Text>
    </TouchableOpacity>
       </View>
    </ScrollView>
  )
}

export default KeyPad