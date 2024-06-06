import { View, Text, TextInput, KeyboardTypeOptions } from 'react-native'
import React from 'react'

interface inputType {
    placeholder: string
    value: string
    handleChange: (text: string) => void
    keyboardType: KeyboardTypeOptions | undefined

}

const Input = ({placeholder, value, handleChange, keyboardType}: inputType) => {
  return (
    <View className='w-full h-[50px] border border-gray-300 rounded-xl justify-center px-5 mt-5'>
    <TextInput
    placeholder={placeholder}
    value={value}
    onChangeText={handleChange}
    keyboardType={keyboardType}
    />
    </View>
  )
}

export default Input