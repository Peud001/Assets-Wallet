import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Search from '../../components/Search'
import { SafeAreaView } from 'react-native-safe-area-context'
import RecentContact from '../../components/RecentContact'

const Contact = () => {

  const [value, setValue] = useState<string>('')

  const handleChange = (text: string) => {
    setValue(text)
  }

  return (
    <SafeAreaView className='px-5'>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Text className='text-2xl text-center p-10 font-bold'>Contact</Text>
      <Search
      value={value}
      placeholder='Search'
      handleChange={handleChange}
      />
      <RecentContact/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Contact