import { View, Text, ScrollView, TouchableOpacity, Image, Switch } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons'
import images from '../../constants/images'
import { useColorScheme } from 'nativewind'

const Profile = () => {

  const [toggle, setToggle] = useState(false)
  const {colorScheme} = useColorScheme()

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
    <SafeAreaView className='px-5 py-8 dark:bg-bgDarkPrimary'>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ---- Part 1---- */}
        <View className='flex-row justify-between'>
          <Text className='text-xl font-bold text-gray-400 dark:text-textPrimary'>Profile</Text>
          <TouchableOpacity>
          <FontAwesome6 name='bell' size={22}/>
          </TouchableOpacity>
        </View>
        {/* ---- Part 2---- */}
        <View className='items-center gap-1 py-5'>
         <View className='relative w-[100px] h-[100px]'>
         <Image
          source={images.user}
          className='w-[100px] h-[100px] rounded-full'
          />
          <TouchableOpacity className='absolute right-0 bottom-0'>
          <FontAwesome6 name='edit' size={18} color='#290067'/>
          </TouchableOpacity>
         </View>
          <Text className='text-lg'>Michael Allen</Text>
          <Text className='text-gray-400 dark:text-textPrimary'>+22 432 4342</Text>
        </View>
        {/* ---- Part 3---- */}
        <View className='gap-7'>
          {
            profileDetails.map((item, index) => (
              <View className='flex-row justify-between items-center' key={index}>
            <View className='flex-row items-center gap-5'>
            <FontAwesome6 name={item.name} size={20} color={colorScheme === "light"? '#290067' : '#E3E3E3'}/>
            <Text className='font-bold dark:text-textPrimary'>{item.title}</Text>
            </View>
            <Text className='text-gray- dark:text-textPrimary'>{item.value}</Text>
          </View>
            ))
          }
          <View className='flex-row justify-between items-center'>
            <View className='flex-row gap-5'>
              <FontAwesome6 name='bell' size={22} color={colorScheme === "light"? '#290067' : '#E3E3E3'}/>
              <Text className='font-bold dark:text-textPrimary'>Notification</Text>
            </View>
            <TouchableOpacity onPress={handleToggle}>
            <Switch
            value={toggle}
            onValueChange={() => setToggle(prev => !prev)}
            />
            </TouchableOpacity>
          </View>
          <TouchableOpacity className='flex-row items-center'>
            <FontAwesome name='sign-out' size={22} color={colorScheme === "light"? '#290067' : '#E3E3E3'}/>
            <Text className='pl-5 font-bold dark:text-textPrimary'>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile