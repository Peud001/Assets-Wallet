import { ScrollView } from "react-native";
import React, { useContext } from "react";
import { Text, View } from "@/components/Themed";
import ArrowBack from "@/components/ArrowBack";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "@/providers/authProvider";
import { AntDesign } from "@expo/vector-icons";

const notification = () => {
  const { user } = useContext(AuthContext);

  return (
    <SafeAreaView>
      <ScrollView className="px-5">
      <View className="flex-row items-center py-7">
        <ArrowBack />
        <View className="w-[86%] items-center">
          <Text className="font-bold text-3xl">Notifications</Text>
        </View>
      </View>
      <View className="flex-row gap-3">
        <AntDesign name="notification" size={24} color="#F79E1B" />
        <View className="flex-1">
        <Text className="font-psemilight">
          Hi <Text className="font-bold">{user?.displayName?.split(" ")[0]}</Text>, thank you for signing up! We're
          excited to have you on board.
        </Text>
        {/* <Text className="font-plight">
          {new Date().toLocaleDateString()} - {new Date().toLocaleTimeString()}
        </Text> */}
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default notification;
