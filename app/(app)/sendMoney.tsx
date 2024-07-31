import {
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, EvilIcons, Feather, FontAwesome6, Fontisto } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { Text, View } from "@/components/Themed";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { firebaseDb } from "@/services/auth";
import Toast from "react-native-root-toast";
import { useColorScheme } from "nativewind";
import { useAppDispatch, useAppSelector } from "@/features/store/Hooks";
import { fetchBalance } from "@/features/slice/balanceSlice";
import { StatusBar } from "expo-status-bar";
import { SelectList } from "react-native-dropdown-select-list";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native";
import { AuthContext } from "@/providers/authProvider";
import { fetchTransferHistory } from "@/features/slice/statSlice";

const formSchema = z.object({
  accountNumber: z
    .string()
    .min(10, "Account number is required")
    .max(10, "Account number must be 10 numbers"),
  amount: z
    .number()
    .min(1, "Amount is required")
    .max(100000000, "Amount is out of range"),
});

const SendMoney = () => {
  const { user } = useContext(AuthContext);
  const { colorScheme } = useColorScheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigation();
  const [selectedBank, setSelectedBank] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [amount, setAmount] = useState('');
  const [beneficiaryAccount, setBeneficiaryAccount] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [banks, setBanks] = useState([]);
  const balance = useAppSelector((state) => state.balance.balance);
  const currentBalance = balance ? balance.balance : 0;
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      accountNumber: "",
      amount: "",
    },
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const getBanks = async () => {
      try {
        const res = await fetch("https://nigerianbanks.xyz");
        if (!res.ok) {
          Toast.show("Failed! Please try again", { duration: Toast.durations.LONG });
          return;
        }
        const data = await res.json();
        const bankData = data.map((item: any, index: number) => ({
          key: index,
          value: item.name,
        }));
        setBanks(bankData);
      } catch (error) {
        console.error("Failed to fetch banks:", error);
      }
    };

    getBanks();
  }, []);

  const handlePress = async (data: any) => {
    if (!selectedBank) {
      Toast.show("Select bank", { duration: Toast.durations.LONG });
      return;
    }
    if (!user) {
      Toast.show("User is not authenticated.", { duration: Toast.durations.LONG });
      return;
    }
    if (data.amount > currentBalance) {
      Toast.show("Insufficient balance", { duration: Toast.durations.LONG });
      return;
    }
    setIsSubmitting(true);
    try {
      const validatedData = formSchema.parse(data);
      setAmount(validatedData.amount.toString());
      setBeneficiaryAccount(validatedData.accountNumber);
      await addDoc(collection(firebaseDb, "users", user.uid, "transactions"), {
        title: `Transfer to ${validatedData.accountNumber}`,
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
        balance: currentBalance - validatedData.amount,
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
  };

  const closeModal = () => {
    setShowModal(false);
    setBeneficiaryAccount("");
    setAmount("");
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Modal animationType="slide" transparent={true} visible={showModal}>
          <View className="flex-1 justify-center items-center bg-[#00000090]">
            <View className="bg-white p-5 rounded-lg w-[90%]">
              <View className="items-center my-5">
                <Feather name="check-circle" size={50} color="green" />
                <Text className="mt-5 font-pbold text-xl text-black">
                  Transfer Successful
                </Text>
                <Text className="text-[#a0a0a0] font-pregular text-center text-[#333]">
                  Your money has been transferred successfully
                </Text>
              </View>
              <View className="flex-row justify-between items-center my-5">
                <Text className="text-[#a0a0a0] font-plight text-[#333]">
                  Transfer Amount
                </Text>
                <Text className="font-psemibold text-[#333]">
                  ₦{parseFloat(amount).toFixed(2)}
                </Text>
              </View>
              <View className="flex-row justify-between items-center mb-5">
                <Text className="font-plight text-[#333]">Beneficiary</Text>
                <View className="items-end">
                  <Text className="text-[#333]">{beneficiaryAccount}</Text>
                  <Text className="font-pextralight text-[#333]">- {selectedBank}</Text>
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
        <View className="px-3">
          <View className="flex-row align-center px-3 my-10">
            <TouchableOpacity
              onPress={() => (navigate.canGoBack() ? navigate.goBack() : router.replace("home"))}
              accessibilityLabel="Go back"
            >
              <Fontisto
                name="angle-left"
                size={20}
                color={colorScheme === "light" ? "black" : "white"}
              />
            </TouchableOpacity>
            <Text className="text-center flex-1 text-3xl font-psemibold">
              Send Money
            </Text>
          </View>

          <View className="my-5">
            <SelectList
              setSelected={setSelectedBank}
              data={banks}
              save="value"
              placeholder="Select Bank"
              dropdownTextStyles={{color: colorScheme === "light" ? "#333" : "#c0c0c0",}}
              inputStyles={{color: colorScheme === "light" ? "#333" : "#c0c0c0",}}
              searchicon={<EvilIcons name="search" size={20} color={colorScheme === "light" ? "#333" : "#c0c0c0"}/>}
              closeicon={<FontAwesome6 name="times" size={24} color={colorScheme === "light" ? "#333" : "#c0c0c0"} />}
            />
          </View>

          <Controller
            control={control}
            name="accountNumber"
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
              <View className="my-5">
                <TextInput
                  placeholder="Enter account number"
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
          <Controller
            control={control}
            name="amount"
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
              <View className="my-5">
                <TextInput
                  placeholder="Enter amount"
                  placeholderTextColor={colorScheme === "light" ? "#333" : "#c0c0c0"}
                  value={value.toString()}
                  onChangeText={(text) => {
                    const parsedValue = parseFloat(text);
                    if (!isNaN(parsedValue)) {
                      onChange(parsedValue);
                    } else {
                      onChange(0);
                    }
                  }}
                  onBlur={onBlur}
                  className='border h-[45px] rounded-xl border-[#a0a0a0] px-5'
                  keyboardType="numeric"
                  style={{color: colorScheme === "light" ? "#333" : "#fff",}}
                />
                {error && <Text className="text-red-600 mt-1">{error.message}</Text>}
              </View>
            )}
          />

          <TouchableOpacity
            onPress={handleSubmit(handlePress)}
            className="h-[50px] rounded-2xl items-center justify-center bg-[#3155E9] mt-5"
            disabled={isSubmitting}
            accessibilityLabel="Submit transfer"
          >
            <Text className="font-bold text-white text-xl">
              {isSubmitting ? <ActivityIndicator size="large" color="#fff" /> : "Send"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar style={colorScheme === "light" ? "dark" : "light"} />
    </SafeAreaView>
  );
};

export default SendMoney;
