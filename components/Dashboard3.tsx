import { TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons'
import images from '../constants/images'
import { router } from 'expo-router'
import { Text, View } from './Themed'
import { useColorScheme } from 'nativewind'

const Dashboard3 = () => {

  const data = [
    {uri: images.promo1},
    {uri: images.promo2}
  ]

  const {colorScheme} = useColorScheme()

  return (
    <View className='w-full h-full' >
      <View className='flex-row w-full justify-between'>
        <TouchableOpacity className='flex-row p-4 items-center justify-evenly rounded-2xl flex-1' onPress={() => router.replace('/sendMoney')}>
        <FontAwesome6 name="arrow-right-arrow-left" size={24} color={colorScheme==='light'? '#1F1F1F' : '#C0C0C0'}/>
          <Text className='pl-4'>Transfer</Text>
        </TouchableOpacity>
        <TouchableOpacity className='flex-row p-4 items-center justify-evenly rounded-2xl flex-1 ml-7' onPress={() => router.replace('/topUp')}>
        <FontAwesome6 name="money-bill-wave" size={24} color={colorScheme==='light'? '#1F1F1F' : '#C0C0C0'} />
          <Text className='pl-4'>Top Up</Text>
        </TouchableOpacity>
      </View>
      <View className='pt-5'>
        <View className='flex-row justify-between items-center'>
        <Text className='text-xl font-semibold'>Promo & Discount</Text>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className="pt-5 flex-row"
        >
          {data.map((item, index) => (
            <Image
              source={item.uri}
              key={index}
              className="w-[280px] h-[180px] rounded-3xl mr-3"
            />
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

export default Dashboard3