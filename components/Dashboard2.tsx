import { View, Text } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons'


const Dashboard2 = () => {

    const data = [
        {name: 'recycle', title: 'Top Up'},
        {name: 'arrow-alt-circle-up', title: 'Send'},
        {name: 'arrow-alt-circle-down', title: 'Request'},
        {name: 'business-time', title: 'History'}
    ]

  return (
    <View className='relative w-full rounded-t-3xl bg-white p-5 items-center z-10'>
      <View className='w-full h-20 bg-white absolute -top-10 rounded-2xl shadow-sm flex-row justify-between px-4 items-center'>
        {
            data.map((item, index) => (
                <View key={index} className='items-center'>
                    <FontAwesome6 name={item.name} size={22} color='#BD94FA'/>
                <Text className='text-[#333]'>{item.title}</Text>
                </View>
            ))
        }
      </View>
    </View>
  )
}

export default Dashboard2