import { View, Text, Alert, TouchableOpacity } from 'react-native'
import React from 'react'
import { useForm } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import FormInput from '../components/FormInput'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { SignIn } from '@/services/auth'


const formSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  })

const Login = () => {

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(formSchema)
  })

  const handlePress = async(data: any) => {
    const validatedData = formSchema.parse(data)
    await SignIn(validatedData)
  }

  return (
    <SafeAreaView className='w-full h-full justify-center px-5 bg-[#16171E]'>
       <View className='items-center gap-2 mb-5'>
       <Ionicons name="diamond" size={60} color="#BFC5CB" />
       <Text className='text-3xl font-bold text-[#BFC5CB]'>Welcome</Text>
       <Text className='text-[#BFC5CB]'>Login to your Account</Text>
       </View>
        <FormInput
          control={control}
          name={'email'}
          placeholder='email'
        />
        <FormInput
          control={control}
          name={'password'}
          placeholder='password'
        />
        <TouchableOpacity onPress={handleSubmit(handlePress)} className='border h-[50px] rounded-2xl items-center justify-center bg-[#3155E9]'>
          <Text>Login</Text>
        </TouchableOpacity>
        <Text className='pt-3 text-center text-[#BFC5CB]'>Don't have an account? <Link href='/register' className='font-bold'><Text className='text-[#FBBC05]'>Sign Up</Text></Link></Text>
        <Link href='home' className='text-white mt-5'>Go to Home</Link>
    </SafeAreaView>
  )
}

export default Login