import {KeyboardTypeOptions, TextInput, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import { Feather } from '@expo/vector-icons'
import { Text, View } from './Themed'


interface FormPropType {
    control:  any
    name: string
    placeholder: string
    isLoading: boolean
    keyboardType: KeyboardTypeOptions
}

const FormInput = ({ control, name, isLoading, keyboardType, ...otherProps }: FormPropType) => {

    const [showPassword, setShowPassword] = useState(false)

    const isPassword = name === 'password' || name === 'confirmPassword'

    return (
        <View className='mb-5'>
            <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                <View>
                   <View className='mb-3 h-[50px] border flex-row items-center rounded-2xl p-3 focus:border-red-300 bg-white'>
                   <TextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        secureTextEntry={isPassword && !showPassword}
                        {...otherProps}
                         className=' w-full flex-1 h-[50px]'
                         editable={!isLoading}
                         keyboardType={keyboardType}
                    />
                    {
                        isPassword && <TouchableOpacity
                        onPress={() => setShowPassword(prev => !prev)}
                        >
                            <Feather name={showPassword ? "eye" : "eye-off"} size={22} color='#1f1f1f' />
                        </TouchableOpacity>
                    }
                   </View>
                    {
                        error && <Text className='text-red-600 mt-1'>{error.message}</Text>
                    }
                </View>
            )}
        />
        </View>
    )
}

export default FormInput