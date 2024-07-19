import { Text, View } from "@/components/Themed";
import { useAppSelector } from "@/features/store/Hooks";
import { EvilIcons, FontAwesome6 } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";


const statistics = () => {

  const transferHistory = useAppSelector(state => state.stat.transferHistory)

  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    let income = 0;
    transferHistory.forEach((element: any) => {
      income += element.amount;
    });
    setTotalIncome(income);
  }, [transferHistory]);

  const pieData = [
    {
      value: (totalIncome / totalIncome) * 100,
      color: "#00AA4D",
      text: "Income",
    },
    { value: 30, color: "red", text: "Expenses" },
  ]

  return (
    <SafeAreaView>
      <ScrollView className="px-3">
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
        <Text className="font-bold text-2xl">History</Text>
        <View>
          {
            transferHistory.map((item: any, index: number) => (
              <View key={index} className="flex-row items-center justify-between mt-5">
                <View className="flex-row items-center gap-2">
                <EvilIcons name="arrow-left" size={24} color="#F57C7C" />
                    <View>
                      <Text className="font-bold text-lg">Transfer to {item.firstName} {item.lastName}</Text>
                      <Text className="">{item.date} - {item.time}</Text>
                    </View>
                </View>
                <Text className="text-lg text-red-400">-${item.amount}</Text>
              </View>
            ))
          }
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default statistics;
