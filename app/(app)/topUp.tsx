import { View, Text } from '@/components/Themed'
import { BalanceType, fetchBalance } from '@/features/slice/balanceSlice'
import { fetchTransferHistory } from '@/features/slice/statSlice'
import { useAppDispatch, useAppSelector } from '@/features/store/Hooks'
import { firebaseDb } from '@/services/auth'
import { FontAwesome, Fontisto } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore'
import { useColorScheme } from 'nativewind'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, TextInput, TouchableOpacity } from 'react-native'
import Toast from 'react-native-root-toast'
import { SafeAreaView } from 'react-native-safe-area-context'

const TopUp = () => {

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const formattedDateManual = `${day}-${month}-${year}`;
  const timeString = currentDate.toLocaleTimeString();

  const navigate = useNavigation()
  const dispatch = useAppDispatch()

  const accountBalance = useAppSelector(state => state.balance.balance as BalanceType[])

  const [balance, setBalance] = useState<any>(0)
  const [isLoading, setIsLoading] = useState(false)

  const {colorScheme} = useColorScheme()

  const handleChange = (value: string ) => {
    const numericValue = parseFloat(value)
    setBalance(numericValue)
  }

  const handlePress = async() => {
    setIsLoading(true)
    const currentBalance = accountBalance.length > 0 && accountBalance[0].balance
    await updateDoc(doc(firebaseDb, "balance", "amount"), {
      balance: balance + currentBalance,
    })
    await addDoc(collection(firebaseDb, "statData"), {
      firstName: 'credit from topUp',
      amount: balance,
      date: formattedDateManual,
      time: timeString,
      iconName: 'arrow-alt-circle-right',
      iconColor: 'green'
    });
    dispatch(fetchBalance())
    dispatch(fetchTransferHistory())
    setIsLoading(false)
    setBalance('')
    Toast.show('Successful.', {
      duration: Toast.durations.LONG,
    });
  }

  return (
    <SafeAreaView>
       <View className='flex-row items-center p-3'>
       <TouchableOpacity
              onPress={() =>
                navigate.canGoBack()
                  ? navigate.goBack()
                  : router.replace("home")
              }
            >
              <Fontisto
                name="angle-left"
                size={20}
                color={colorScheme === "light" ? "black" : "white"}
              />
            </TouchableOpacity>
            <View className='w-[90%] items-center'>
            <Text className='font-bold text-3xl'>Top Up</Text>
            <Text className='mt-3 mb-5'>Add funds to your wallet</Text>
            </View>
       </View>
      <View className=' items-center px-3 py-5'>
        <TextInput
        placeholder='Enter Amount'
        keyboardType='numeric'
        value={balance}
        onChangeText={(value) => handleChange(value)}
        className='border bg-white w-full h-[60px] rounded-xl text-xl p-3 mb-5'
        />
        <TouchableOpacity
        className='w-full h-[60px] rounded-xl items-center justify-center bg-[#3155E9]'
        onPress={handlePress}
        >
          <Text className='text-white font-bold'>{isLoading? <ActivityIndicator color='white' size='large'/> : 'Add'}</Text>
        </TouchableOpacity>
      </View>
      <StatusBar
        style={colorScheme === 'light' ? 'dark' : 'light'}
      />
      </SafeAreaView>
  )
}

export default TopUp