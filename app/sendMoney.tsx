import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list';

type Bank = {
    name: string;
    code: string;
}

const SendMoney = () => {

    const navigate = useNavigation()
    const [banks, setBanks] = useState<Bank[]>([])
    const [selectedAccount, setSelectedAccount] = useState<string>('')
    const [selectedBank, setSelectedBank] = useState<string>('')

    const accountName = [
        {id: 1, name: 'Saving'},
        {id: 2, name: 'Current'},
        {id: 3, name: 'Domiciliary'}
    ]

    useEffect(() => {
        getBanks();
    }, []);

    const getBanks = async () => {
        try {
            const response = await fetch('https://nigerianbanks.xyz');
            const result = await response.json()
            setBanks(result)
        } catch (error) {
            console.error('Error fetching banks:', error)
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                showsVerticalScrollIndicator={false} >
                <LinearGradient
                    colors={['#290067', '#4600AC']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <View className='flex-row px-5 py-7'>
                        <TouchableOpacity onPress={() => { navigate.goBack() }}>
                            <FontAwesome6 name='angle-left' color='#fff' size={28} />
                        </TouchableOpacity>
                        <Text className='text-white text-2xl font-bold text-center w-full'>Send Money</Text>
                    </View>
                    <View className=' p-3 bg-white rounded-t-3xl '>
                        <Text className='p-1'>From Account</Text>
                        <SelectList
                            setSelected={(val: string) => setSelectedAccount(val)}
                            data={accountName.map((account) => ({ key: account.id, value: account.name }))}
                            placeholder='Select account to debit'
                            search={false}
                        />
                    </View>
                </LinearGradient>
                <View className='h-full bg-white'>
                    <View className=' p-3 bg-white rounded-t-3xl '>
                        <Text className='p-1'>To Bank</Text>
                        <SelectList
                            setSelected={(val: string) => setSelectedBank(val)}
                            data={banks.map((bank: Bank) => ({ key: bank.code, value: bank.name }))}
                            placeholder='Select Bank'
                            notFoundText='Bank is not found'
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default SendMoney;
