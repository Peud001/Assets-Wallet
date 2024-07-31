import { ScrollView, TextInput, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "@/components/Themed";
import NetworkProviders from "@/components/NetworkProviders";
import ArrowBack from "@/components/ArrowBack";
import { useColorScheme } from "nativewind";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ActivityIndicator } from "react-native";
import { AuthContext } from "@/providers/authProvider";
import Toast from "react-native-root-toast";


const formSchema = z.object({
  phoneNumber: z
    .string()
    .min(11, "Phone number is required")
    .max(11, "Phone number must be 11 numbers"),
  amount: z
    .number()
    .min(1, "Amount is required")
    .max(10000000, "Amount is out of range"),
});

const Airtime = () => {

  const {user} = useContext(AuthContext)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const {colorScheme} = useColorScheme()

  const [network, setNetwork] = useState('')

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      phoneNumber: "",
      amount: "",
    },
    resolver: zodResolver(formSchema),
  });

  const handleTouch = (name: string) => {
    name===network? '' : setNetwork(name)
  }

  const handlePress = (data: any) => {
    console.log('name')
    if (!user) {
      Toast.show("User is not authenticated.", { duration: Toast.durations.LONG });
      return;
    }
    if (network==='') {
      Toast.show("Choose Network.", { duration: Toast.durations.LONG });
      return;
    }
    const validatedData = formSchema.parse(data);
    console.log(validatedData)
  }

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} className="px-3">
        <View className="flex-row items-center px-3 py-7">
          <ArrowBack />
          <View className="w-[86%] items-center">
            <Text className="font-bold text-3xl">Airtime</Text>
          </View>
        </View>
        <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
              <View className="my-7">
                <Text className="mb-2">Phone Number</Text>
                <TextInput
                  placeholder="Enter phone number"
                  placeholderTextColor={colorScheme === "light" ? "#333" : "#c0c0c0"}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  className='border h-[45px] rounded-xl border-[#a0a0a0] px-5'
                  keyboardType="numeric"
                  style={{color: colorScheme === "light" ? "#333" : "#fff",}}
                />
                {error && <Text className="text-red-600 mt-1">{error.message}</Text>}
              </View>
            )}
          />
        <View>
          <NetworkProviders handlePress={handleTouch} network={network}/>
        </View>
        <View>
        <Controller
            control={control}
            name="amount"
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
              <View className="my-7">
                <Text className="mb-2">Amount</Text>
                <TextInput
                  placeholder="Enter Amount"
                  placeholderTextColor={colorScheme === "light" ? "#333" : "#c0c0c0"}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  className='border h-[45px] rounded-xl border-[#a0a0a0] px-5'
                  keyboardType="numeric"
                  style={{color: colorScheme === "light" ? "#333" : "#fff",}}
                />
                {error && <Text className="text-red-600 mt-1">{error.message}</Text>}
              </View>
            )}
          />
        </View>
        <TouchableOpacity
            onPress={handleSubmit(handlePress)}
            className="h-[50px] rounded-2xl items-center justify-center bg-[#3155E9] mt-5"
            accessibilityLabel="Submit transfer"
          >
            <Text className="font-bold text-white text-xl">
              {isSubmitting ? <ActivityIndicator size="large" color="#fff" /> : "Send"}
            </Text>
          </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Airtime;
