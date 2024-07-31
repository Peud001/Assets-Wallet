import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo, Feather } from '@expo/vector-icons'
import { router } from 'expo-router'

const UtilityCard = ({label, iconName, name}:{label: string, iconName: any, name: string}) => {
  return (
      <TouchableOpacity onPress={() => router.push(`/${name}`)} className='bg-[#1D1F2B] w-1/4 h-[80px] rounded-2xl p-3 items-center justify-center gap-2'>
       <Entypo name={iconName} size={24} color="#F79E1B" />
        <Text className='text-[#e0e0e0]'>{label}</Text>
       </TouchableOpacity>
  )
}

export default UtilityCard