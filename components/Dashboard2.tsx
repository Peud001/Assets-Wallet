import { Image, View, Text } from 'react-native'
import { useEffect } from 'react'
import images from '@/constants/images'
import { useAppSelector } from '@/features/store/Hooks'
import { BalanceType, fetchBalance } from '@/features/slice/balanceSlice'


const Dashboard2 = () => {

  const accountBalance = useAppSelector(state => state.balance.balance as BalanceType[])

  return (
    <View className='w-full rounded-2xl shadow-sm items-center p-5 my-5 bg-[#1D1F2B]'>
      <View className='w-full flex-row justify-between'>
      <View>
        <Text className='text-[#c0c0c0]'>Current Balance</Text>
        <Text className='text-2xl font-bold text-white mt-1'>$ {accountBalance && accountBalance.length > 0 ? accountBalance[0].balance : '0.00'}</Text>
      </View>
      <Image source={images.cardLogo} className='h-[50px] w-[50px] rounded-2xl'/>
      </View>
      <View className='mt-20 w-full bg-[#1D1F2B]'>
        <Text className='text-[#c0c0c0] text-lg text-left'>3121460133</Text>
      </View>
    </View>
  )
}

export default Dashboard2