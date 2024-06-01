import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons'
import images from '../../constants/images'

const Profile = () => {

  const [toggle, setToggle] = useState(false)

  const profileDetails = [
    {name: 'arrow-alt-circle-up', title: 'Email', value:'example@gmail.com'},
    {name: 'phone', title: 'Phone', value:'+22 234 2345'},
    {name: 'vest', title: 'Privacy', value:<FontAwesome6 name="angle-right" size={22} color="#c6d3e6" />},
    {name: 'clipboard-question', title: 'Help', value: <FontAwesome6 name="angle-right" size={22} color="#c6d3e6" />},
  ]

  const handleToggle = () => {
    setToggle(prev => !prev)
  }

  return (
    <SafeAreaView className='px-5 py-8'>
      <ScrollView>
        {/* ---- Part 1---- */}
        <View className='flex-row justify-between'>
          <Text className='text-xl font-bold text-gray-400'>Profile</Text>
          <TouchableOpacity>
          <FontAwesome6 name='bell' size={22}/>
          </TouchableOpacity>
        </View>
        {/* ---- Part 2---- */}
        <View className='items-center gap-1 py-5'>
          <Image
          source={images.user}
          className='w-[100px] h-[100px] rounded-full'
          />
          <Text className='text-lg'>Michael Allen</Text>
          <Text className='text-gray-400'>+22 432 4342</Text>
        </View>
        {/* ---- Part 3---- */}
        <View className='gap-7'>
          {
            profileDetails.map((item, index) => (
              <View className='flex-row justify-between items-center'>
            <View className='flex-row items-center gap-5'>
            <FontAwesome6 name={item.name} size={20} color='#290067'/>
            <Text className='font-bold'>{item.title}</Text>
            </View>
            <Text className='text-gray-400'>{item.value}</Text>
          </View>
            ))
          }
          <View className='flex-row justify-between'>
            <View className='flex-row gap-5'>
              <FontAwesome6 name='bell' size={22} color='#290067'/>
              <Text className='font-bold'>Notification</Text>
            </View>
            <TouchableOpacity onPress={handleToggle}>
            <FontAwesome6 name={toggle? 'toggle-on' : 'toggle-off' } size={30} color='#290067'/>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile