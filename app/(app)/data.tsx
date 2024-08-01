import { ScrollView, TextInput, TouchableOpacity } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
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
import { useAppDispatch, useAppSelector } from "@/features/store/Hooks";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { firebaseDb } from "@/services/auth";
import { fetchBalance } from "@/features/slice/balanceSlice";
import { fetchTransferHistory } from "@/features/slice/statSlice";
import { Modal } from "react-native";
import { EvilIcons, Feather, FontAwesome6 } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";


const formSchema = z.object({
  phoneNumber: z
    .string()
    .min(11, "Phone number is required")
    .max(11, "Phone number must be 11 numbers"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .max(10000000, "Amount is out of range"),
});

const Data = () => {

  const dispatch = useAppDispatch()
  const balance = useAppSelector(state => state.balance.balance)
  const newBalance = balance ? balance.balance : 0;

  const {user} = useContext(AuthContext)

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [network, setNetwork] = useState<string>('')
  const [amount, setAmount] = useState<string | number>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedPlan, setSelectedPlan] = useState("")
  const [data, setData] = useState([])

  const {colorScheme} = useColorScheme()

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

  const handlePress = async(data: any) => {
    
    if (!user) {
      Toast.show("User is not authenticated.", { duration: Toast.durations.LONG });
      return;
    }
    if (network==='') {
      Toast.show("Choose Network.", { duration: Toast.durations.LONG });
      return;
    }
    if (network==='') {
      Toast.show("Choose Network.", { duration: Toast.durations.LONG });
      return;
    }
    if (data.amount > newBalance) {
      Toast.show("Insufficient balance", { duration: Toast.durations.LONG });
      return;
    }
    setIsSubmitting(true)
    try {
      const validatedData = formSchema.parse(data);
      setAmount(validatedData.amount.toString());
      setPhoneNumber(validatedData.phoneNumber);
      await addDoc(collection(firebaseDb, "users", user.uid, "transactions"), {
        title: `Data top-up ${validatedData.phoneNumber}`,
        amount: `-₦${validatedData.amount}`,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        iconName: "arrow-alt-circle-left",
        iconColor: "#F57C7C",
        uid: user.uid,
        timestamp: serverTimestamp(),
      });
      await addDoc(collection(firebaseDb, "allExpense", user.uid, "transactions"), {
        amount: validatedData.amount,
      });
      await setDoc(doc(firebaseDb, "balance", user.uid), {
        balance: newBalance - parseFloat(validatedData.amount),
      });
      dispatch(fetchBalance(user.uid));
      dispatch(fetchTransferHistory(user.uid));
      setShowModal(true);
      reset();
    } catch (err) {
      Toast.show("Failed - please try again", { duration: Toast.durations.LONG });
    } finally {
      setIsSubmitting(false);
    }

  }

  const closeModal = () => {
    setShowModal(false);
    setPhoneNumber("");
    setAmount("");
    setNetwork("")
  };

  const fetchData = useCallback(async () => {
    if (network) {
      try {
        const apiUrl =
          network === 'MTN'
            ? 'https://api-service.vtpass.com/api/service-variations?serviceID=mtn-data'
            : network === 'GLO'
            ? 'https://api-service.vtpass.com/api/service-variations?serviceID=glo-data'
            : network === 'AIRTEL'
            ? 'https://api-service.vtpass.com/api/service-variations?serviceID=airtel-data'
            : network === '9MOBILE'
            ? 'https://api-service.vtpass.com/api/service-variations?serviceID=etisalat-data'
            : ''

        if (apiUrl) {
          const response = await fetch(apiUrl);
          const res = await response.json();
          const result = res.content.variations || [];
          const finalResult = result.map((item: any, index: number) => ({
            key: index,
            value: item.name
          }));
          setData(finalResult);
        }
      } catch (error) {
        console.error("No data found", error);
      }
    }
  }, [network]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} className="px-3">
      <Modal animationType="slide" transparent={true} visible={showModal}>
          <View className="flex-1 justify-center items-center bg-[#00000090]">
            <View className="bg-white p-5 rounded-lg w-[90%]">
              <View className="items-center my-5">
                <Feather name="check-circle" size={50} color="green" />
                <Text className="mt-5 font-pbold text-xl text-black">
                  Data top-up successful
                </Text>
                <Text className="text-[#a0a0a0] font-pregular text-center text-[#333]">
                  {`Your ${network} line has been credited with ${amount} data subscription`}
                </Text>
              </View>
              <View className="flex-row justify-between items-center my-5">
                <Text className="text-[#a0a0a0] font-plight text-[#333]">
                  Subscription
                </Text>
                <Text className="font-psemibold text-[#333] w-[170px]">
                  {selectedPlan}
                </Text>
              </View>
              <View className="flex-row justify-between items-center mb-5">
                <Text className="font-plight text-[#333]">Beneficiary</Text>
                <View className="items-end">
                  <Text className="text-[#333]">{phoneNumber}</Text>
                  <Text className="font-pextralight text-[#333]">- {network}</Text>
                </View>
              </View>
              <View className="flex-row items-center justify-between mb-5">
                <Text className="text-[#a0a0a0] font-plight text-[#333]">
                  Date & time
                </Text>
                <Text className="text-[#333]">{new Date().toLocaleDateString()}</Text>
              </View>
              <TouchableOpacity
                className="h-[50px] rounded-2xl items-center justify-center bg-[#3155E9] mb-5"
                onPress={closeModal}
                accessibilityLabel="Close success modal"
              >
                <Text className="text-white font-bold">Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View className="flex-row items-center px-3 py-7">
          <ArrowBack />
          <View className="w-[86%] items-center">
            <Text className="font-bold text-3xl">Data</Text>
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
        <View className="my-5">
        <Text className="mb-2">Select a plan</Text>
            <SelectList
              setSelected={setSelectedPlan}
              data={data}
              save="value"
              placeholder="Choose data plan"
              dropdownTextStyles={{color: colorScheme === "light" ? "#333" : "#c0c0c0",}}
              inputStyles={{color: colorScheme === "light" ? "#333" : "#c0c0c0",}}
              searchicon={<EvilIcons name="search" size={20} color={colorScheme === "light" ? "#333" : "#c0c0c0"}/>}
              closeicon={<FontAwesome6 name="times" size={20} color={colorScheme === "light" ? "#333" : "#c0c0c0"} />}
            />
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
              {isSubmitting ? <ActivityIndicator size="large" color="#fff" /> : "Continue"}
            </Text>
          </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Data;
