import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Search from '../../components/Search'
import { SafeAreaView } from 'react-native-safe-area-context'

const Contact = () => {

  const [value, setValue] = useState('')

  const handleChange = (text) => {
    console.log(text)
    setValue(text)
  }

  return (
    <SafeAreaView className='p-5'>
      <Text>Contact</Text>
      <Search
      value={value}
      placeholder='Search'
      handleChange={handleChange}
      />
    </SafeAreaView>
  )
}

export default Contact