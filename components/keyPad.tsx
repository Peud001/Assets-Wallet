import { TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { Text, View } from './Themed';

interface pressType {
  onPress: (value: string) => void;
}

const KeyPad = ({ onPress }: pressType) => {
  return (
    <ScrollView>
      <View className='flex-row justify-between max-w-[680px] mb-10'>
        <TouchableOpacity onPress={() => onPress('9')} className='w-12 h-12 items-center justify-center '>
          <Text className='text-2xl text-gray-500'>9</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPress('8')} className='w-12 h-12 items-center justify-center '>
          <Text className='text-2xl text-gray-500'>8</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPress('7')} className='w-12 h-12 items-center justify-center '>
          <Text className='text-2xl text-gray-500'>7</Text>
        </TouchableOpacity>
      </View>
      <View className='flex-row justify-between max-w-[680px] mb-10'>
        <TouchableOpacity onPress={() => onPress('6')} className='w-12 h-12 items-center justify-center '>
          <Text className='text-2xl text-gray-500'>6</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPress('5')} className='w-12 h-12 items-center justify-center '>
          <Text className='text-2xl text-gray-500'>5</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPress('4')} className='w-12 h-12 items-center justify-center '>
          <Text className='text-2xl text-gray-500'>4</Text>
        </TouchableOpacity>
      </View>
      <View className='flex-row justify-between max-w-[680px] mb-10'>
        <TouchableOpacity onPress={() => onPress('3')} className='w-12 h-12 items-center justify-center '>
          <Text className='text-2xl text-gray-500'>3</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPress('2')} className='w-12 h-12 items-center justify-center '>
          <Text className='text-2xl text-gray-500'>2</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPress('1')} className='w-12 h-12 items-center justify-center '>
          <Text className='text-2xl text-gray-500'>1</Text>
        </TouchableOpacity>
      </View>
      <View className='flex-row justify-between max-w-[680px] mb-10'>
        <TouchableOpacity onPress={() => onPress('.')} className='w-12 h-12 items-center justify-center '>
          <Text className='text-2xl text-gray-500'>.</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPress('0')} className='w-12 h-12 items-center justify-center '>
          <Text className='text-2xl text-gray-500'>0</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPress('delete')} className='w-12 h-12 items-center justify-center '>
          <FontAwesome6 name='delete-left' size={22}/> 
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default KeyPad;
