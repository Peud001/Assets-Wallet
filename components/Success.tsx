import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

type ModelValuesType = {
    title: string
    subTitle: string
    item1: string
    item1Value: string | number
    item2: string
    item2Value: string
    item3: string
    item3Value: string
    closeModal: () => void
}

const Success = ({
  title,
  subTitle,
  item1,
  item1Value,
  item2,
  item2Value,
  item3,
  item3Value,
  closeModal,
}: ModelValuesType) => {
  return (
    <View className="flex-1 justify-center items-center bg-[#00000090]">
      <View className="bg-white p-5 rounded-lg w-[90%]">
        <View className="items-center my-5">
          <Feather name="check-circle" size={50} color="green" />
          <Text className="mt-5 font-pbold text-xl text-black">{title}</Text>
          <Text className="text-[#a0a0a0] font-pregular text-center text-[#333]">
            {subTitle}
          </Text>
        </View>
        <View className="flex-row justify-between items-center my-5">
          <Text className="font-plight text-[#333]">
            {item1}
          </Text>
          <Text className="font-psemibold text-[#333]">{item1Value}</Text>
        </View>
        <View className="flex-row justify-between items-center mb-5">
          <Text className="font-plight text-[#333]">{item2}</Text>
          <View className="items-end">
            <Text className="text-[#333] font-psemibold">{item2Value}</Text>
          </View>
        </View>
        <View className="flex-row items-center justify-between mb-5">
          <Text className="font-plight text-[#333]">
            {item3}
          </Text>
          <Text className="text-[#333] font-psemibold">{item3Value}</Text>
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
  );
};

export default Success;
