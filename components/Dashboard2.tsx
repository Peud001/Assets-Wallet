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
        <Text className='text-[#c0c0c0] font-pextralight'>Current Balance</Text>
       <View className='flex-row items-center gap-1'>
       <Text className='font-pregular text-white text-2xl'>$</Text>
       <Text className='text-2xl text-white mt-1 font-psemibold'>{accountBalance && accountBalance.length > 0 ? accountBalance[0].balance : '0.00'}</Text>
       </View>
      </View>
      <Image source={images.cardLogo} className='h-[50px] w-[60px] rounded-2xl'/>
      </View>
      <View className='mt-20 w-full flex-row gap-2 items-center'>
        <Text className='text-[#c0c0c0] font-pextralight'>A/C No.</Text>
        <Text className='text-[#c0c0c0] text-lg text-left font-plight'>3121460133</Text>
      </View>
    </View>
  )
}

export default Dashboard2