import ArrowBack from "@/components/ArrowBack";
import { View, Text } from "@/components/Themed";
import { BalanceType, fetchBalance } from "@/features/slice/balanceSlice";
import { fetchTransferHistory } from "@/features/slice/statSlice";
import { useAppDispatch, useAppSelector } from "@/features/store/Hooks";
import { AuthContext } from "@/providers/authProvider";
import { firebaseDb } from "@/services/auth";
import { FontAwesome, Fontisto } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useColorScheme } from "nativewind";
import React, { useContext, useState } from "react";
import { ActivityIndicator, TextInput, TouchableOpacity } from "react-native";
import Toast from "react-native-root-toast";
import { SafeAreaView } from "react-native-safe-area-context";

const TopUp = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigation();
  const dispatch = useAppDispatch();

  const accountBalance = useAppSelector((state) => state.balance.balance);
  console.log(accountBalance)
  const [balance, setBalance] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const { colorScheme } = useColorScheme();

  const handleChange = (value: string) => {
    const numericValue = parseFloat(value);
    setBalance(numericValue);
  };

  const handlePress = async () => {
    if (!user) {
      Toast.show("User is not authenticated.", {
        duration: Toast.durations.LONG,
      });
      return;
    }
    if(!balance) {
      Toast.show("Enter Amount", {
        duration: Toast.durations.LONG,
      });
      return
    }

    setIsLoading(true);

    const currentBalance = accountBalance ? accountBalance.balance : 0;
    const newBalance = balance + currentBalance;
    const statData = {
      title: "Added to wallet",
      amount: `+₦${balance}`,
      date: new Date().toISOString().split('T')[0], 
      time: new Date().toLocaleTimeString(),
      iconName: "arrow-alt-circle-right",
      iconColor: "#43A047",
      uid: user.uid,
      timestamp: serverTimestamp(),
    };

    try {
      await setDoc(doc(firebaseDb, "balance", user.uid), { balance: newBalance });
      await addDoc(collection(firebaseDb, "users", user.uid, "transactions"), statData);
      await addDoc(collection(firebaseDb, "allIncome", user.uid, "transactions"), {amount: balance});

      dispatch(fetchBalance(user.uid));
      dispatch(fetchTransferHistory(user.uid));
      setIsLoading(false);
      setBalance('');
      Toast.show("Successful.", {
        duration: Toast.durations.LONG,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      setIsLoading(false);
      Toast.show("Error occurred. Please try again.", {
        duration: Toast.durations.LONG,
      });
    }
  };

  return (
    <SafeAreaView>
      <View className="flex-row items-center p-3">
        <ArrowBack/>
        <View className="w-[86%] items-center">
          <Text className="font-bold text-3xl">Top Up</Text>
          <Text className="mt-3 mb-5">Add funds to your wallet</Text>
        </View>
      </View>
      <View className="items-center px-3 py-5">
        <TextInput
          placeholder="Enter Amount"
          keyboardType="numeric"
          value={balance}
          onChangeText={handleChange}
          className="border bg-white w-full h-[60px] rounded-xl text-xl p-3 mb-5"
        />
        <TouchableOpacity
          className="w-full h-[60px] rounded-xl items-center justify-center bg-[#3155E9]"
          onPress={handlePress}
        >
          <Text className="text-white font-bold">
            {isLoading ? (
              <ActivityIndicator color="white" size="large" />
            ) : (
              "Add"
            )}
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style={colorScheme === "light" ? "dark" : "light"} />
    </SafeAreaView>
  );
};

export default TopUp;
