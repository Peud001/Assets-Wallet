import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons'
import images from '../constants/images'
import { Redirect, router } from 'expo-router'

const Dashboard3 = () => {

  const data = [
    {uri: images.promo1},
    {uri: images.promo2}
  ]

  return (
    <View className='w-full h-full dark:bg-bgDarkSecondary' >
      <View className='flex-row w-full justify-between'>
        <TouchableOpacity className='flex-row p-4 bg-btnBg items-center justify-evenly rounded-2xl flex-1' onPress={() => router.replace('/sendMoney')}>
        <FontAwesome6 name="arrow-right-arrow-left" size={24} color="black"/>
          <Text className='pl-4'>Transfer</Text>
        </TouchableOpacity>
        <TouchableOpacity className='flex-row p-4 bg-[#ECEFF7] items-center justify-evenly rounded-2xl flex-1 ml-7'>
        <FontAwesome6 name="money-bill-wave" size={24} color="black" />
          <Text className='pl-4'>Bills</Text>
        </TouchableOpacity>
      </View>
      <View className='pt-5'>
        <View className='flex-row justify-between items-center'>
        <Text className='text-xl font-semibold dark:text-textSecondary'>Promo & Discount</Text>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className="pt-5 flex-row gap-1"
        >
          {data.map((item, index) => (
            <Image
              source={item.uri}
              key={index}
              className="w-[280px] h-[180px] rounded-3xl"
            />
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

export default Dashboard3