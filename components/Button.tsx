import { TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { Text } from './Themed'

const Button = ({active, isSubmitting, handleSubmit}: any) => {
  return (
    <TouchableOpacity
    className='rounded-xl h-[50px] items-center justify-center border border-gray-300 bg-[#4600AC]'
    // style={{ backgroundColor: active ? '#4600AC' : '#fff' }}
    // disabled={!active || isSubmitting}
    onPress={handleSubmit}
    >
        <Text className='text-lg font-bold' style={{color: active ? '#fff' : '#C5C6C7'}}>
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