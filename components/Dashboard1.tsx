import { Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { Feather, MaterialIcons} from '@expo/vector-icons'
import images from '../constants/images'
import { useColorScheme } from 'nativewind'
import ThemeToggle from './ThemeToggle'
import { Text, View } from './Themed'
import { AuthContext } from '@/providers/authProvider'


const Dashboard1 = () => {

  const {colorScheme} = useColorScheme()
  const { user } = useContext(AuthContext);
  console.log(user?.photoURL)
  
  return (
        <View className='flex-row items-center justify-between'>
          <View>
            {
            user?.photoURL?  <Image
            source={{uri: user?.photoURL}}
            className='w-[30px] h-[30px] mb-2 rounded-full'
            /> :  <Image
            source={images.user}
            className='w-[30px] h-[30px] mb-2 rounded-full'
            />
           }
          <View className='flex-row items-center gap-2'>
          <Text className='text-xl font-pmedium'>Hello</Text>
          <Text className='text-xl font-pbold'>{user?.displayName?.split(" ")[0]}</Text>
          <MaterialIcons name="waving-hand" size={20} color='#C7BA2F' />
          </View>
          </View>
        <View className='flex-row items-center'>
          <ThemeToggle/>
        <TouchableOpacity className='pl-5'>
        <Feather name='bell' size={26} color={`${colorScheme==='light'? '#333' : '#c0c0c0'}`}/>
        </TouchableOpacity>
        </View>
        </View>
  )
}

export default Dashboard1