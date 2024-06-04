import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import KeyPad from '../components/keyPad';
import { FontAwesome6 } from '@expo/vector-icons';

const SendMoney = () => {

    const handlePress = () => {
    }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={['#290067', '#4600AC']}
        start={{x:0, y: 0}}
        end={{x:1, y: 0}}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false} 
        >
            <View className=''>
                <View className='flex-row px-5 py-10'>
                    <TouchableOpacity>
                        <FontAwesome6 name='angle-left' color='#fff' size={28}/>
                    </TouchableOpacity>
                    <Text className='text-white text-2xl font-bold text-center w-full'>Send Money</Text>
                </View>
               <View className='bg-white rounded-t-3xl flex-1 h-full'>
               <View className=' px-5 py-10'>
                    <Text className='text-3xl border border-gray-300 rounded-2xl p-3'>O</Text>
                </View>
                <KeyPad onPress={handlePress} />
               </View>
            </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

export default SendMoney;
