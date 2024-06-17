import { View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list';
import Input from '../components/CustomInput';
import Button from '../components/Button';

type Bank = {
    name: string;
    code: string;
}

const SendMoney = () => {

    const navigate = useNavigation()
    const [banks, setBanks] = useState<Bank[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [value, setValue] = useState({
        selected_account : '',
        selected_bank : '',
        account_num : '',
        amount : '',
        narration : ''
    })
    
    const active = value.selected_account && value.selected_bank && value.account_num && value.amount


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
    }

    const handleSubmit = async() => {
        console.log('tapped')
        try{
            setIsSubmitting(true)
            setTimeout(()=>{
                setIsSubmitting(false)
                console.log('successfull')
            }, 3000)
        }catch(err){
            console.log('failed')
            setIsSubmitting(false)
        }
    }

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <ScrollView
                showsVerticalScrollIndicator={false} >
                <LinearGradient
                    colors={['#290067', '#4600AC']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <View className='flex-row px-5 py-7'>
                        <TouchableOpacity onPress={() => { navigate.goBack() }}>
                            <FontAwesome6 name='angle-left' color='#fff' size={24} />
                        </TouchableOpacity>
                        <Text className='text-white text-2xl font-bold text-center w-full'>Send Money</Text>
                    </View>
                    <View className=' p-3 bg-white rounded-t-3xl '>
                        <Text className='p-1'>From Account</Text>
                        <SelectList
                            setSelected={(val: string) => setValue({...value, selected_account: val})}
                            data={accountName.map((account) => ({ key: account.id, value: account.name }))}
                            placeholder='Select account to debit'
                            search={false}
                            boxStyles={{
                                borderColor: '#C5C6C7'
                            }}
                        />
                    </View>
                </LinearGradient>
                <View className='px-3'>
                        <Text className='p-1'>To Bank</Text>
                        <SelectList
                            setSelected={(val: string) => setValue({...value, selected_bank: val})}
                            data={banks.map((bank: Bank) => ({ key: bank.code, value: bank.name }))}
                            placeholder='Select Bank'
                            notFoundText='Bank is not found'
                            boxStyles={{
                                borderColor: '#C5C6C7'
                            }}
                        />
                    <Input
                    placeholder='Enter Destination Account'
                    value={value.account_num}
                    handleChange={(e) => setValue({...value, account_num: e})}
                    keyboardType='numeric'
                    />
                    <Input
                    placeholder='Enter Amount'
                    value={value.amount}
                    handleChange={(e) => setValue({...value, amount: e})}
                    keyboardType='numeric'
                    />
                    <Input
                    placeholder='Enter Naration'
                    value={value.narration}
                    handleChange={(e) => setValue({...value, narration: e})}
                    keyboardType='default'
                    />
                     <Button active={active} isSubmitting={isSubmitting} handleSubmit={handleSubmit}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default SendMoney;
