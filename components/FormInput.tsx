import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import { Feather } from '@expo/vector-icons'


interface FormPropType {
    control:  any
    name: string
    placeholder: string
    isLoading: boolean
    keyboardType: string
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
                   <View className='mb-3 h-[50px] border flex-row items-center rounded-2xl p-3 bg-[#21222B] focus:border-red-300'>
                   <TextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        secureTextEntry={isPassword && !showPassword}
                        {...otherProps}
                         className=' w-full flex-1 h-[50px] text-[#BFC5CB] '
                         placeholderTextColor="#888"
                         editable={!isLoading}
                         keyboardType={keyboardType}
                    />
                    {
                        isPassword && <TouchableOpacity
                        onPress={() => setShowPassword(prev => !prev)}
                        >
                            <Feather name={showPassword ? "eye" : "eye-off"} size={22} color="#888" />
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