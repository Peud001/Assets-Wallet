import { ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormInput from '../../components/FormInput';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar'
import { SignUp} from '../../services/auth';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from 'nativewind';

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name is too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name is too long'),
  email: z.string().min(1, 'Please enter a valid email').email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Password must be at least 8 characters long')
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
});

type DataType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};


const Register = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    resolver: zodResolver(formSchema)
  })

  const handlePress = async (data: DataType) => {
    try {
      const validatedData = formSchema.parse(data)
      await SignUp(validatedData)
      reset
    } catch (error) {
      console.error("Registration error:", error);
    }
  }

  const {colorScheme} = useColorScheme()

  return (
    <SafeAreaView className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false} className="px-3 py-5 h-full">
        <View className="items-center gap-2 my-6">
          <Ionicons name="diamond" size={60} color={colorScheme==='light'? '#1f1f1f' : '#c0c0c0'} />
          <Text className="font-bold text-2xl">Welcome</Text>
          <Text>Create an account here</Text>
        </View>
        <FormInput
          control={control}
          name="firstName"
          placeholder="First name"
        />
        <FormInput
          control={control}
          name="lastName"
          placeholder="Last name"
        />
        <FormInput
          control={control}
          name="email"
          placeholder="Email"
        />
        <FormInput
          control={control}
          name="password"
          placeholder="Password"
        />
        <FormInput
          control={control}
          name="confirmPassword"
          placeholder="Confirm password"
        />
        <TouchableOpacity onPress={handleSubmit(handlePress)} className="border h-[50px] rounded-2xl items-center justify-center bg-[#3155E9] mt-4">
          <Text className="text-white">Sign Up</Text>
        </TouchableOpacity>
        <View className="justify-center flex-row p-2">
          <Text className="text-[#BFC5CB]">Already have an account? </Text>
          <Link href="/" className="font-bold">Sign In</Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
