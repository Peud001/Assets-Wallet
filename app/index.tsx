import { View, Text, Alert, TouchableOpacity } from 'react-native'
import React from 'react'
import { useForm } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import FormInput from '../components/FormInput'
import { Link } from 'expo-router'


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

  const handlePress = (data: any) => {
    reset()
  }

  return (
    <SafeAreaView className='w-full h-full justify-center px-5'>
        <Text className='text-3xl font-bold text-center mb-5'>Login</Text>
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
        <TouchableOpacity onPress={handleSubmit(handlePress)} className='border h-[50px] rounded-2xl items-center justify-center'>
          <Text>Submit</Text>
        </TouchableOpacity>
        <Text className='pt-3 text-center'>Don't have an account? <Link href='register'>Sign Up</Link></Text>
        <Link href='home'>Go to Home</Link>
    </SafeAreaView>
  )
}

export default Login