import React, { useContext, useEffect, useState } from "react";
import { Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PieChart } from "react-native-gifted-charts";
import { Text, View } from "@/components/Themed";
import { useAppSelector } from "@/features/store/Hooks";
import { FontAwesome6 } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { collection, DocumentData, getDocs, query } from "firebase/firestore";
import { firebaseDb } from "@/services/auth";
import { AuthContext } from "@/providers/authProvider";
import { User } from "firebase/auth";
import images from "@/constants/images";

const Statistics = () => {
  const { colorScheme } = useColorScheme();
  const transferHistory = useAppSelector((state) => state.stat.transferHistory);
  const balance = useAppSelector((state) => state.balance.balance);
  const totalBalance = balance ? balance.balance : 0;
  const { user } = useContext(AuthContext);

  const [allExpense, setAllExpense] = useState<DocumentData[]>([]);
  const [allIncome, setAllIncome] = useState<DocumentData[]>([]);

  const fetchTransactions = async (user: User, type: string) => {
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

  useEffect(() => {
    if (user) {
      (async () => {
        const incomeData = await fetchTransactions(user, "allIncome");
        const expenseData = await fetchTransactions(user, "allExpense");

        setAllIncome(incomeData);
        setAllExpense(expenseData);
      })();
    }
  }, [user]);

  const sumIncome = allIncome.reduce((acc, val) => acc + (val.amount || 0), 0);
  const sumExpense = allExpense.reduce((acc, val) => acc + (val.amount || 0), 0);
  const denom = sumIncome + sumExpense;

  console.log(sumIncome)
  console.log(sumExpense)

  const percentIncome = denom ? (sumIncome * 100) / denom : 0;
  const percentExpense = denom ? (sumExpense * 100) / denom : 0;

  const pieData = [
    { value: percentIncome, color: "green", text: "Income" },
    { value: percentExpense, color: "red", text: "Expense" },
  ];

  return (
    <SafeAreaView>
      <ScrollView className="px-3" showsVerticalScrollIndicator={false}>
        <Text className="text-center font-psemibold text-3xl pt-5">Statistics</Text>
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
          <View className='items-center pt-5'>
          <Image source={images.emoji} className='w-[50px] h-[50px]'/>
         <Text className='font-pextralight text-sm pt-2'>looks like the's no recent</Text>
         <Text className='font-pextralight text-sm'>activity to share here.</Text>
         <Text className='font-plight text-sm'>Make a transaction today</Text>
        </View>
        ) : (
            <View>
              <Text className="font-bold text-2xl text-center">History</Text>
              {transferHistory.map((item, index) => (
                <View key={index} className="flex-row items-center justify-between mt-5">
                  <View className="flex-row items-center gap-2">
                    <FontAwesome6 name={item.iconName} size={24} color={item.iconColor} />
                    <View>
                      <Text className="font-bold text-lg">{item.title}</Text>
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
      <StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />
    </SafeAreaView>
  );
};

export default Statistics;
