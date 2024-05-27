import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Page() {
  return (
    <View className="flex-1 w-full h-full bg-red-300 justify-center items-center">
      <Text className="text-3xl">Assets Wallet</Text>
      <Link href='/home' className="text-2xl text-blue-800">Go to home</Link>
    </View>
  );
}


