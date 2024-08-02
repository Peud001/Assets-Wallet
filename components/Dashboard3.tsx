import { TouchableOpacity, Image} from "react-native";
import React, { useContext, useEffect } from "react";
import {
  FontAwesome6
} from "@expo/vector-icons";
import images from "../constants/images";
import { router } from "expo-router";
import { Text, View } from "./Themed";
import { useColorScheme } from "nativewind";
import UtilityCard from "./utilityCard";
import { useAppDispatch, useAppSelector } from "@/features/store/Hooks";
import {
  fetchTransferHistory,
  getTotalExpense,
  getTotalIncome,
} from "@/features/slice/statSlice";
import { AuthContext } from "@/providers/authProvider";
import { fetchBalance } from "@/features/slice/balanceSlice";
import { fetchTransactions } from "@/app/(app)/(tabs)/statistics";

const Dashboard3 = () => {
  const { user } = useContext(AuthContext);

  const dispatch = useAppDispatch();

  const transactionHistory = useAppSelector(
    (state) => state.stat.transferHistory
  );

  useEffect(() => {
    if (user) {
      (async () => {
        dispatch(fetchTransferHistory(user.uid));
        dispatch(fetchBalance(user.uid));

        const incomeData = await fetchTransactions(user, "allIncome");
        const expenseData = await fetchTransactions(user, "allExpense");

        dispatch(getTotalIncome(incomeData));
        dispatch(getTotalExpense(expenseData));
      })();
    }
  }, []);

  const { colorScheme } = useColorScheme();

  return (
    <View className="w-full h-full">
      <View className="flex-row w-full justify-between">
        <TouchableOpacity
          className="flex-row p-4 items-center justify-evenly rounded-2xl flex-1"
          onPress={() => router.replace("/sendMoney")}
        >
          <FontAwesome6
            name="arrow-right-arrow-left"
            size={24}
            color={colorScheme === "light" ? "#1F1F1F" : "#C0C0C0"}
          />
          <Text className="pl-4">Transfer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row p-4 items-center justify-evenly rounded-2xl flex-1 ml-7"
          onPress={() => router.replace("/topUp")}
        >
          <FontAwesome6
            name="money-bill-wave"
            size={24}
            color={colorScheme === "light" ? "#1F1F1F" : "#C0C0C0"}
          />
          <Text className="pl-4">Top Up</Text>
        </TouchableOpacity>
      </View>
      <View className="pt-5 flex-row justify-evenly">
        <UtilityCard label={"Airtime"} iconName={"phone"} name={'airtime'} />
        <UtilityCard label={"Data"} iconName={"network"} name={'data'} />
        <UtilityCard label={"Electricity"} iconName={"light-bulb"} name={'electricity'}/>
      </View>
      <View className="py-5 flex-row justify-between items-center">
        <Text className="font-psemibold text-xl">Recent Activity</Text>
        <TouchableOpacity onPress={() => router.replace("/history")}>
          <Text className="font-pmedium text-lg text-[#F79E1B]">See all</Text>
        </TouchableOpacity>
      </View>
      <View>
        {transactionHistory.length > 0 ? (
          <View>
            {transactionHistory.slice(0, 4).map((item: any, index: number) => (
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
                      ? "text-green-600"
                      : "text-[#F57C7C]"
                  }`}
                >
                  {item.amount}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <View className="items-center pt-5">
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
        )}
      </View>
    </View>
  );
};

export default Dashboard3;
