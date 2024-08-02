import { Image, View, Text } from 'react-native'
import { useContext, useEffect } from 'react'
import images from '@/constants/images'
import { useAppDispatch, useAppSelector } from '@/features/store/Hooks'
import { fetchPhoneNumber } from '@/features/slice/balanceSlice'
import { AuthContext } from '@/providers/authProvider'


const Dashboard2 = () => {

  const {user} = useContext(AuthContext)

  const dispatch = useAppDispatch()

  const accountBalance = useAppSelector(state => state.balance.balance)
  const phone = useAppSelector(state => state.balance.phoneNumber)

  const balance = (accountBalance?.balance)?.toFixed(2) ?? '0.00'

  useEffect(()=>{
    if(user){
      dispatch(fetchPhoneNumber(user.uid))
    }
  },[])

  return (
    <View className='w-full rounded-2xl shadow-sm items-center p-5 my-5 bg-[#1D1F2B]'>
      <View className='w-full flex-row justify-between'>
      <View>
        <Text className='text-[#c0c0c0] font-pextralight'>Current Balance</Text>
       <View className='flex-row items-center gap-1'>
       <Text className='font-pregular text-white text-2xl'>₦</Text>
       <Text className='text-2xl text-white mt-1 font-psemibold'>{balance}</Text>
       </View>
      </View>
      <Image source={images.cardLogo} className='h-[50px] w-[60px] rounded-2xl'/>
      </View>
      <View className='mt-20 w-full flex-row gap-2 items-center'>
        <Text className='text-[#c0c0c0] font-pextralight'>A/C No.</Text>
        <Text className='text-[#c0c0c0] text-lg text-left font-plight'>{phone?.slice(1, -1)}</Text>
      </View>
    </View>
  )
}

export default Dashboard2