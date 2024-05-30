import { View, Text, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native'
import React from 'react'
import {Utility} from '../constants/utility'
import { FontAwesome6 } from '@expo/vector-icons'
import images from '../constants/images'

const Dashboard3 = () => {

  const data = [
    {uri: images.promo1},
    {uri: images.promo2}
  ]

  return (
    <View className='w-full h-full bg-white p-5'>
      <Text className='text-xl font-semibold'>Payment List</Text>
      <View className='flex-row flex-wrap justify-between gap-5'>
        {Utility.map((item, index) => (
            <TouchableOpacity key={index} className='justify-center items-center gap-1 pt-5'>
                <FontAwesome6 name={item.name} size={28} color={item.color}/>
                <Text>{item.title}</Text>
            </TouchableOpacity>
        ))}
      </View>
      <View className='pt-5'>
        <View className='flex-row justify-between items-center'>
        <Text className='text-xl font-semibold'>Promo & Discount</Text>
        <TouchableOpacity>
        <Text className='font-semibold text-[17px] text-purple-800'>See more</Text>
        </TouchableOpacity>
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