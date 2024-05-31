import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import images from '../constants/images'

const contactList = [
  {name: 'Clarissa Bates', bank: 'Bank - 000218872531', image: images.user},
  {name: 'Thomas Diwantara', bank: 'Bank - 000218872532', image: images.user},
  {name: 'Mark Johnson', bank: 'Bank - 000218872533', image: images.user},
  {name: 'Anisa Bella', bank: 'Bank - 000218872534', image: images.user},
  {name: 'Angelina Johnson', bank: 'Bank - 000218872535', image: images.user},
  {name: 'Johan Crafton', bank: 'Bank - 000218872536', image: images.user},
  {name: 'Ariana Manisa', bank: 'Bank - 000218872537', image: images.user},
  {name: 'Solomon Udofia', bank: 'Bank - 000218872538', image: images.user},
]

const RecentContact = () => {
  return (
    <View>
      <Text className='py-5 text-lg text-gray-400 font-bold'>Recent Contact</Text>
      <View className=''>
        {contactList.map((list, index) => (
          <TouchableOpacity key={index} className='flex-row items-center gap-5 mb-[15px]'>
            <Image 
            source={list.image}
            className='w-[60px] h-[60px] rounded-full'
            resizeMode='contain'
            />
            <View className='gap-1'>
              <Text className='text-xl font-semibold'>{list.name}</Text>
              <Text className='text-gray-400'>{list.bank}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default RecentContact