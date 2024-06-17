import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons'
import { router } from 'expo-router'


const Dashboard2 = () => {

  return (
    <View className='relative w-full rounded-t-3xl dark:bg-bgDarkSecondary p-5 items-center z-10'>
      <View className='w-full h-20 bg-white dark:bg-bgDarkPrimary absolute -top-10 rounded-2xl shadow-sm flex-row justify-between px-4 items-center'>
      <TouchableOpacity onPress={() => router.push('/topUp')} className='items-center'>
                    <FontAwesome6 name='recycle' size={22} color='#BD94FA'/>
                <Text className='dark:text-textSecondary'>Top Up</Text>
                </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/sendMoney')} className='items-center'>
                    <FontAwesome6 name='arrow-alt-circle-up' size={22} color='#BD94FA'/>
                <Text className='dark:text-textSecondary'>Send</Text>
                </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/request')} className='items-center'>
                    <FontAwesome6 name='arrow-alt-circle-down' size={22} color='#BD94FA'/>
                <Text className='dark:text-textSecondary'>Request</Text>
                </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/history')} className='items-center'>
                    <FontAwesome6 name='business-time' size={22} color='#BD94FA'/>
                <Text className='dark:text-textSecondary'>History</Text>
                </TouchableOpacity>
      </View>
    </View>
  )
}

export default Dashboard2