import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Button = () => {
  return (
    <TouchableOpacity
    className='bg-[#4600AC] rounded-xl h-[50px] mt-5 items-center justify-center border border-[#4600AC]'
    >
        <Text className='text-lg font-bold text-white'>Continue</Text>
    </TouchableOpacity>
  )
}

export default Button