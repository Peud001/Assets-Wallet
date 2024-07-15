import { ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Search from '../../../components/Search'
import { SafeAreaView } from 'react-native-safe-area-context'
import RecentContact from '../../../components/ContactModal'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { useGetContactsQuery } from '@/features/slice/apiSlice'
import { Text, View } from '@/components/Themed'

const Contact = ({}) => {

  const [value, setValue] = useState<string>('')

  const handleChange = (text: string) => {
    setValue(text)
  }

   const { data, error, isLoading } = useGetContactsQuery()

   const renderItem = ({item}) => (
    <View className="">
       <TouchableOpacity className="flex-row items-center gap-5 mb-[15px]">
         <Image
           source={{ uri: item.image }}
           className="w-[50px] h-[50px] rounded-full"
         />
         <View>
           <Text className="text-lg font-semibold">
             {item.firstName} {item.lastName}
           </Text>
           <Text className="text-gray-400">Bank - {item.accountNumber}</Text>
         </View>
       </TouchableOpacity>
     </View>
   )

   const header = () => (
    <View>
      <Text className='text-2xl text-center p-10 font-bold'>Contact</Text>
      <Search
      value={value}
      placeholder='Search'
      handleChange={handleChange}
      />
      <RecentContact/>
    </View>
   )

  return (
    <SafeAreaView>
      <View className='px-5'>
      {
        isLoading? <View className='h-full justify-center items-center'>
          <ActivityIndicator size='large' color='#0000ff' />
          <Text>Just a moment, please ....</Text>
          </View> : 
        <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => <View className='h-full justify-center items-center'><Text>No contact, yet!</Text></View>}
        renderItem={renderItem}
        ListHeaderComponent={header}
        showsVerticalScrollIndicator={false}
        />
      }
      </View>
    </SafeAreaView>
  )
}

export default Contact