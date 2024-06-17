import { View, Text, Image } from 'react-native'
import React from 'react'
import images from '../constants/images'

const Success = ({title, sub}) => {
    return (
        <View className='bg-[#FFFAF0] py-10 px-5'>
            <View className='items-center'>
                <Image
                    source={images.greenTick}
                    className='w-[100px] h-[100px] rounded-full'
                />
                <Text className='text-center text-xl font-bold'>Transfer Successful!</Text>
                <Text className='text-gray-400'>Your money has been transfered successfully!</Text>
            </View>
            <View className='w-full h-[1px] bg-gray-200 my-10'></View>
            <View>
                <View className='flex-row justify-between items-center mb-5'>
                    <Text className='text-gray-400'>Amount</Text>
                    <Text>2000</Text>
                </View>
                <View className='flex-row justify-between items-center mb-5'>
                    <Text className='text-gray-400'>Date</Text>
                    <Text>10/10/1988</Text>
                </View>
                <View className='flex-row justify-between items-center mb-5'>
                    <Text className='text-gray-400'>Description</Text>
                    <Text>Paid for rehabilitation of the international conference center</Text>
                </View>
            </View>
        </View>
    )
}

export default Success