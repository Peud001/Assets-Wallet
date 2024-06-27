import { ActivityIndicator, FlatList, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Search from '../../../components/Search'
import { SafeAreaView } from 'react-native-safe-area-context'
import RecentContact, { ModalInputType } from '../../../components/ContactModal'
import { getContacts } from '@/lib/fetchContacts'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'

const Contact = ({}) => {

  const [value, setValue] = useState<string>('')
  const [contactList, setContactList] = useState<ModalInputType[]>([]) //Should be made a global state
  const [isContactLoading, setIsContactLoading] = useState(false)

  const handleChange = (text: string) => {
    setValue(text)
  }

  const handleContact = async() => {
    try{
      setIsContactLoading(prev => !prev)
    const contacts = await getContacts()
    setContactList(contacts)
    }catch(error){
      console.log(error)
    }finally{
      setIsContactLoading(prev => !prev)
    }
  }

  useEffect(()=>{
    handleContact()
   }, [])

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
    <SafeAreaView className='flex-1 px-5'>
      {
        isContactLoading? <View className='h-full justify-center items-center'>
          <ActivityIndicator size='large' color='#0000ff' />
          <Text>Just a moment, please ....</Text>
          </View> : 
        <FlatList
        data={contactList}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => <Text>No contact, yet!</Text>}
        renderItem={renderItem}
        ListHeaderComponent={header}
        showsVerticalScrollIndicator={false}
        />
      }
    </SafeAreaView>
  )
}

export default Contact