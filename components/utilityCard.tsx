import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo, Feather } from '@expo/vector-icons'

const UtilityCard = ({label, iconName}:{label: string, iconName: any}) => {
  return (
      <TouchableOpacity className='bg-[#1D1F2B] w-1/4 h-[80px] rounded-2xl p-3 items-center justify-center gap-2'>
       <Entypo name={iconName} size={24} color="#F79E1B" />
        <Text className='text-[#e0e0e0]'>{label}</Text>
       </TouchableOpacity>
  )
}

export default UtilityCard