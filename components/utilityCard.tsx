import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'

const UtilityCard = () => {
  return (
      <TouchableOpacity className='bg-[#1D1F2B] w-1/4 h-[80px] rounded-2xl p-3 items-center justify-center gap-2'>
       <Feather name="phone-call" size={24} color="#F79E1B" />
        <Text className='text-[#e0e0e0]'>Airtime</Text>
       </TouchableOpacity>
  )
}

export default UtilityCard