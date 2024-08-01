import React, { useContext, useEffect, useState } from "react";
import { Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PieChart } from "react-native-gifted-charts";
import { Text, View } from "@/components/Themed";
import { useAppDispatch, useAppSelector } from "@/features/store/Hooks";
import { FontAwesome6 } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { collection, DocumentData, getDocs, query } from "firebase/firestore";
import { firebaseDb } from "@/services/auth";
import { AuthContext } from "@/providers/authProvider";
import { User } from "firebase/auth";
import images from "@/constants/images";
import { getTotalExpense, getTotalIncome } from "@/features/slice/statSlice";
import IncomeExpense from "@/components/IncomeExpense";

export const fetchTransactions = async (user: User, type: string) => {
  if (!user) return [];

  try {
    const q = query(collection(firebaseDb, type, user.uid, "transactions"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error(`Error getting ${type} documents: `, error);
    return [];
  }
};

const Statistics = () => {
  const { colorScheme } = useColorScheme();
  const transferHistory = useAppSelector((state) => state.stat.transferHistory);
  const balance = useAppSelector((state) => state.balance.balance);
  const totalBalance = balance ? balance.balance : 0;
  const { user } = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const allIncome = useAppSelector((state) => state.stat.totalIncome);
  const allExpense = useAppSelector((state) => state.stat.totalExpense);

  useEffect(() => {
    if (user) {
      (async () => {
        const incomeData = await fetchTransactions(user, "allIncome");
        const expenseData = await fetchTransactions(user, "allExpense");

        dispatch(getTotalIncome(incomeData));
        dispatch(getTotalExpense(expenseData));
      })();
    }
  }, [user]);

  const sumIncome = allIncome.reduce((acc, val) => acc + (val.amount || 0), 0);
  const sumExpense = allExpense.reduce((acc, val) => acc + (val.amount || 0), 0);
  const denom = sumIncome + sumExpense;

  const percentIncome = denom ? (sumIncome * 100) / denom : 0;
  const percentExpense = denom ? (sumExpense * 100) / denom : 0;

  const pieData = [
    { value: percentIncome, color: "#579B6E", text: 'Income' },
    { value: percentExpense, color: "#e53529", text: 'Expense' },
  ];

  return (
    <SafeAreaView>
      <ScrollView className="px-3" showsVerticalScrollIndicator={false}>
        <View>
          {
            transferHistory.length > 0? (<View>
              <Text className="text-center font-psemibold text-3xl pt-5">
          Statistics
        </Text>
        <View className="items-center my-9">
          <PieChart
            showText
            textColor="white"
            radius={150}
            textSize={20}
            data={pieData}
          />
        </View>
        <IncomeExpense
        sumExpense ={sumExpense}
        percentExpense = {percentExpense}
        sumIncome = {sumIncome}
        percentIncome = {percentIncome}
        />
        <View>
          <Text className="text-2xl font-psemibold mt-10 mb-5 text-center">History</Text>
            {transferHistory.slice(0, 4).map((item: any, index: number) => (
              <View
                key={index}
                className="flex-row items-center justify-between mb-5"
              >
                <View className="flex-row items-center gap-2">
                  <FontAwesome6
                    name={item.iconName}
                    size={24}
                    color={item.iconColor}
                  />
                  <View>
                    <Text className="font-bold text-lg">{item.title}</Text>
                    <Text>
                      {item.date} - {item.time}
                    </Text>
                  </View>
                </View>
                <Text
                  className={`text-lg font-psemibold text-xl ${
                    item.title === "Added to wallet"
                      ? "text-green-700"
                      : "text-red-600"
                  }`}
                >
                  {item.amount}
                </Text>
              </View>
            ))}
          </View>
            </View>) : (
              <View className="items-center pt-5 justify-center">
              <Image source={images.emoji} className="w-[50px] h-[50px]" />
              <Text className="font-pextralight text-sm pt-2">
                looks like the's no recent
              </Text>
              <Text className="font-pextralight text-sm">
                activity to share here.
              </Text>
              <Text className="font-plight text-sm">
                Make a transaction today
              </Text>
            </View>
            )
          }
        </View>
      </ScrollView>
      <StatusBar style={colorScheme === "light" ? "dark" : "light"} />
    </SafeAreaView>
  );
};

export default Statistics;
