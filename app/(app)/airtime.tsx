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
import { useAppDispatch, useAppSelector } from "@/features/store/Hooks";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { firebaseDb } from "@/services/auth";
import { fetchBalance } from "@/features/slice/balanceSlice";
import { fetchTransferHistory } from "@/features/slice/statSlice";
import { Modal } from "react-native";
import { Feather } from "@expo/vector-icons";
import Success from "@/components/Success";

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

const Airtime = () => {
  const dispatch = useAppDispatch();
  const balance = useAppSelector((state) => state.balance.balance);
  const newBalance = balance ? balance.balance : 0;

  const { user } = useContext(AuthContext);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [network, setNetwork] = useState<string>("");
  const [amount, setAmount] = useState<string | number>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const { colorScheme } = useColorScheme();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      phoneNumber: "",
      amount: "",
    },
    resolver: zodResolver(formSchema),
  });

  const handleTouch = (name: string) => {
    name === network ? "" : setNetwork(name);
  };

  const handlePress = async (data: any) => {
    if (!user) {
      Toast.show("User is not authenticated.", {
        duration: Toast.durations.LONG,
      });
      return;
    }
    if (network === "") {
      Toast.show("Choose Network.", { duration: Toast.durations.LONG });
      return;
    }
    if (network === "") {
      Toast.show("Choose Network.", { duration: Toast.durations.LONG });
      return;
    }
    if (data.amount > newBalance) {
      Toast.show("Insufficient balance", { duration: Toast.durations.LONG });
      return;
    }
    setIsSubmitting(true);
    try {
      const validatedData = formSchema.parse(data);
      setAmount(validatedData.amount.toString());
      setPhoneNumber(validatedData.phoneNumber);
      await addDoc(collection(firebaseDb, "users", user.uid, "transactions"), {
        title: `Airtime top-up ${validatedData.phoneNumber}`,
        amount: `-₦${validatedData.amount}`,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        iconName: "arrow-alt-circle-left",
        iconColor: "#F57C7C",
        uid: user.uid,
        timestamp: serverTimestamp(),
      });
      await addDoc(
        collection(firebaseDb, "allExpense", user.uid, "transactions"),
        {
          amount: validatedData.amount,
        }
      );
      await setDoc(doc(firebaseDb, "balance", user.uid), {
        balance: newBalance - parseFloat(validatedData.amount),
      });
      dispatch(fetchBalance(user.uid));
      dispatch(fetchTransferHistory(user.uid));
      setShowModal(true);
      reset();
    } catch (err) {
      Toast.show("Failed - please try again", {
        duration: Toast.durations.LONG,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setPhoneNumber("");
    setAmount("");
    setNetwork("");
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} className="px-3">
        <Modal animationType="slide" transparent={true} visible={showModal}>
          <Success
            title={"Top-up successful"}
            subTitle={`Your ${network} line has been credited with ${amount} airtime`}
            item1={"Airtime Amount"}
            item1Value={`₦${amount}`}
            item2={"Beneficiary"}
            item2Value={phoneNumber}
            item3={" Date & time"}
            item3Value={`${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`}
            closeModal={closeModal}
          />
        </Modal>
        <View className="flex-row items-center px-3 py-7">
          <ArrowBack />
          <View className="w-[86%] items-center">
            <Text className="font-bold text-3xl">Airtime</Text>
          </View>
        </View>
        <Controller
          control={control}
          name="phoneNumber"
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <View className="my-7">
              <Text className="mb-2">Phone Number</Text>
              <TextInput
                placeholder="Enter phone number"
                placeholderTextColor={
                  colorScheme === "light" ? "#333" : "#c0c0c0"
                }
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                className="border h-[45px] rounded-xl border-[#a0a0a0] px-5"
                keyboardType="numeric"
                style={{ color: colorScheme === "light" ? "#333" : "#fff" }}
              />
              {error && (
                <Text className="text-red-600 mt-1">{error.message}</Text>
              )}
            </View>
          )}
        />
        <View>
          <NetworkProviders handlePress={handleTouch} network={network} />
        </View>
        <View>
          <Controller
            control={control}
            name="amount"
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <View className="my-7">
                <Text className="mb-2">Amount</Text>
                <TextInput
                  placeholder="Enter Amount"
                  placeholderTextColor={
                    colorScheme === "light" ? "#333" : "#c0c0c0"
                  }
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  className="border h-[45px] rounded-xl border-[#a0a0a0] px-5"
                  keyboardType="numeric"
                  style={{ color: colorScheme === "light" ? "#333" : "#fff" }}
                />
                {error && (
                  <Text className="text-red-600 mt-1">{error.message}</Text>
                )}
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
            {isSubmitting ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              "Continue"
            )}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Airtime;
