import { TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { Text } from './Themed'

const Button = ({isSubmitting, handleSubmit}: any) => {
  return (
    <TouchableOpacity
    className='rounded-xl h-[50px] items-center justify-center border border-gray-300 bg-[#4600AC]'
    onPress={handleSubmit}
    >
        <Text className='text-lg font-bold text-white'>
            {
            isSubmitting? 
             <ActivityIndicator size='small' color='#fff'/>
             : 'Continue'
            }
            </Text>
    </TouchableOpacity>
  )
}

export default Button