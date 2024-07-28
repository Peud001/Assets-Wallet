import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PieChart } from "react-native-gifted-charts";
import { Text, View } from "@/components/Themed";
import { BalanceType } from "@/features/slice/balanceSlice";
import { useAppSelector } from "@/features/store/Hooks";
import { FontAwesome6 } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";

const Statistics = () => {
  const {colorScheme} = useColorScheme()
  const transferHistory = useAppSelector(state => state.stat.transferHistory);
  const balance = useAppSelector(state => state.balance.balance);
  const totalBalance = balance ? balance[0].balance : 0;

  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    let expense = 0;
    transferHistory.forEach((element: any) => {
      expense += parseFloat(element.amount);
    });
    setTotalExpense(expense);
  }, [transferHistory]);

  const percentData = totalBalance ? (totalExpense * 100) / (totalExpense + totalBalance) : 0;
  const pieData = [
    { value: 100 - percentData, color: "green", text: "Income" },
    { value: percentData, color: "red", text: "Expense" },
  ];

  return (
    <SafeAreaView>
      <ScrollView className="px-3" showsVerticalScrollIndicator={false}>
        <Text className="text-center font-bold text-3xl pt-5">Statistics</Text>
        <View className="items-center my-9">
          <PieChart
            showText
            textColor="white"
            radius={150}
            textSize={20}
            data={pieData}
          />
        </View>
        <View>
          {transferHistory.length < 1 ? (
            <Text className="text-center mt-5">History is empty!</Text>
          ) : (
            <View>
              <Text className="font-bold text-2xl text-center">History</Text>
              {transferHistory.map((item: any, index: number) => (
                <View key={index} className="flex-row items-center justify-between mt-5">
                  <View className="flex-row items-center gap-2">
                    <FontAwesome6 name={item.iconName} size={24} color={item.iconColor} />
                    <View>
                      <Text className="font-bold text-lg">{item.accounNumber}</Text>
                      <Text>{item.date} - {item.time}</Text>
                    </View>
                  </View>
                  <Text className="text-lg">${item.amount}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      <StatusBar
        style={colorScheme === 'light' ? 'dark' : 'light'}
      />
    </SafeAreaView>
  );
};

export default Statistics;
