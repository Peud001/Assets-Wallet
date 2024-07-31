import { View, Text } from 'react-native'
import React from 'react'

const IncomeExpense = ({sumExpense, percentExpense, sumIncome, percentIncome}: any) => {
  return (
    <View className='flex-row justify-between gap-3'>
          <View className='flex-1 bg-[#e0e0e0] rounded-xl items-center justify-center py-10 gap-2'>
            <Text className='font-psemibold text-xl'>Total Expense</Text>
            <Text className='font-pbold text-2xl text-[#e53529]'>-₦{sumExpense.toFixed(2)}</Text>
            <Text className='font-plight text-xl'>{Math.floor(percentExpense)}%</Text>
          </View>
          <View className='flex-1 bg-[#e0e0e0] rounded-xl items-center justify-center py-10 gap-2'>
            <Text className='font-psemibold text-xl'>Total Income</Text>
            <Text className='font-pbold text-2xl text-[#579B6E]'>+₦{sumIncome.toFixed(2)}</Text>
            <Text className='font-plight text-xl'>{Math.floor(percentIncome)}%</Text>
          </View>
        </View>
  )
}

export default IncomeExpense