import { ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../components/FormInput";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SignIn } from "@/services/auth";
import { Text, View } from "@/components/Themed";
import { useColorScheme } from "nativewind";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const Login = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const handlePress = async (data: any) => {
    setIsLoading((prev) => !prev);
    try {
      const validatedData = formSchema.parse(data);
      await SignIn(validatedData);
    } catch (error) {
      setError('An unexpected error occurred, please try again')
    } finally{
      setIsLoading((prev) => !prev);
    }
  };

  const { colorScheme } = useColorScheme();

  return (
    <View className="w-full h-full justify-center px-5">
      <View className="items-center gap-2 mb-5">
        <Ionicons
          name="diamond"
          size={60}
          color={colorScheme === "light" ? "#1F1F1F" : "#C0C0C0"}
        />
        <Text className="text-3xl font-bold text-[#BFC5CB]">Welcome</Text>
        <Text className="text-[#BFC5CB]">Login to your Account</Text>
      </View>
      <FormInput control={control} name={"email"} placeholder="email" isLoading={isLoading} keyboardType="email-address"/>
      <FormInput control={control} name={"password"} placeholder="password" isLoading={isLoading} keyboardType="default"/>
      <TouchableOpacity
        onPress={handleSubmit(handlePress)}
        className="h-[50px] rounded-2xl items-center justify-center bg-[#3155E9]"
      >
        {
          isLoading? <ActivityIndicator color='white' size='large'/> : <Text className="text-white">Login</Text>
        }
      </TouchableOpacity>
      {
        error !== null && <Text className="text-center text-red-300">{error}</Text>
      }
      <Text className="pt-3 text-center">
        Don't have an account?{" "}
        <Link href="(auth)/register" className="font-bold">
          <Text className="text-[#FBBC05]">Sign Up</Text>
        </Link>
      </Text>
    </View>
  );
};

export default Login;
