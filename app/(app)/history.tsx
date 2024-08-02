import { Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome6, Fontisto } from '@expo/vector-icons'
import { Text, View } from '@/components/Themed'
import { useAppSelector } from '@/features/store/Hooks'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../../constants/images'
import { router, useNavigation } from 'expo-router'
import { useColorScheme } from 'nativewind'
import { StatusBar } from 'expo-status-bar'

const history = () => {

    const navigate = useNavigation();
    const { colorScheme } = useColorScheme();

    const transactionHistory = useAppSelector(state => state.stat.transferHistory) 

  return (
   <SafeAreaView>
    <ScrollView showsVerticalScrollIndicator={false}>
    <View className='p-3'>
    <View className="flex-row items-center">
    <TouchableOpacity
          onPress={() =>
            navigate.canGoBack() ? navigate.goBack() : router.replace("home")
          }
        >
          <Fontisto
            name="angle-left"
            size={20}
            color={colorScheme === "light" ? "black" : "white"}
          />
        </TouchableOpacity>
        <View className="w-[86%] items-center">
          <Text className="font-bold text-3xl">History</Text>
        </View>
    </View>
      <View className='mt-5'>
       {
        transactionHistory.length > 0 ? (
          <View>
              {transactionHistory.map((item: any, index: number) => (
                <View key={index} className="flex-row items-center justify-between mb-5">
                  <View className="flex-row items-center gap-2">
                    <FontAwesome6 name={item.iconName} size={24} color={item.iconColor} />
                    <View>
                      <Text className="font-bold text-lg">{item.title}</Text>
                      <Text>{item.date} - {item.time}</Text>
                    </View>
                  </View>
                  <Text  className={`text-lg font-psemibold text-xl ${item.title === "Added to wallet" ? 'text-green-600' : 'text-[#F57C7C]'}`}>{item.amount}</Text>
                </View>
              ))}
            </View>
        ) : (
          <View className='items-center pt-5'>
          <Image source={images.emoji} className='w-[50px] h-[50px]'/>
         <Text className='font-pextralight text-sm'>looks like the's no recent</Text>
         <Text className='font-pextralight text-sm'>activity to share here.</Text>
         <Text className='font-plight text-sm'>Make a transaction today</Text>
        </View>
        )
       }
      </View>
    </View>
    </ScrollView>
    <StatusBar style={colorScheme === "light" ? "dark" : "light"} />
   </SafeAreaView>
  )
}

export default history