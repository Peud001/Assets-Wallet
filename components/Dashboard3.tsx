import { TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { Feather, FontAwesome6, Fontisto, MaterialIcons } from '@expo/vector-icons'
import images from '../constants/images'
import { Link, router } from 'expo-router'
import { Text, View } from './Themed'
import { useColorScheme } from 'nativewind'
import UtilityCard from './utilityCard'

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
      <View className='pt-5 flex-row justify-evenly'>
       <UtilityCard/>
       <UtilityCard/>
       <UtilityCard/>
      </View>
      <View className='py-5 flex-row justify-between items-center'>
        <Text className='font-psemibold text-xl'>Recent Activity</Text>
        <TouchableOpacity>
          <Text className='font-pmedium text-lg text-[#F79E1B]'>See all</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View className='items-center pt-5'>
          <Image source={images.emoji} className='w-[50px] h-[50px]'/>
         <Text className='font-pextralight text-sm'>looks like the's no recent</Text>
         <Text className='font-pextralight text-sm'>activity to share here.</Text>
         <Text className='font-plight text-sm'>Make a transaction today</Text>
        </View>
      </View>
    </View>
  )
}

export default Dashboard3