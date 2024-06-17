import { Text, TextInput, View } from 'react-native'
import React from 'react'
import { Controller } from 'react-hook-form'


interface FormPropType {
    control:  any
    name: string
    placeholder: string
}

const FormInput = ({ control, name, ...otherProps }: FormPropType) => {
    return (
        <View className='mb-5'>
            <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                <View>
                    <TextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        {...otherProps}
                         className='border w-full justify-center rounded-2xl p-3'
                    />
                    {
                        error && <Text className='text-red-600 text-center mt-1'>{error.message}</Text>
                    }
                </View>
            )}
        />
        </View>
    )
}

export default FormInput