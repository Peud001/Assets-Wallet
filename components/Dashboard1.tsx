import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather} from '@expo/vector-icons'
import images from '../constants/images'
import { useColorScheme } from 'nativewind'


const Dashboard1 = () => {

  const {colorScheme, toggleColorScheme} = useColorScheme()
  console.log(colorScheme)

  return (
      <View className='p-5'>
        <View className='flex-row items-center justify-between'>
        <Image
        source={images.user}
        className='w-[50px] h-[50px] rounded-full'
        />
        <TouchableOpacity
        onPress={toggleColorScheme}
        >
        {colorScheme === 'light'? <Feather name="sun" size={28} color="black" /> : <Feather name="moon" size={28} color="white" />}
        </TouchableOpacity>
        </View>
        <View className='w-full items-center pb-9'>
            <Text className='dark:text-textSecondary mt-3 text-lg '>Available Balance</Text>
            <Text className='dark:text-textPrimary text-5xl mt-3 font-semibold'>$450.54</Text>
        </View>
        </View>
  )
}

export default Dashboard1