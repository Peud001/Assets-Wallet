import { Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import images from "@/constants/images";
import { View } from "./Themed";

const NetworkProviders = ({ handlePress, network }: { handlePress: (name: string) => void, network: string }) => {
  const data = [
    { name: images.mtn },
    { name: images.glo },
    { name: images.airtel },
    { name: images.etisalat },
  ];

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View className="flex-row gap-5 justify-between">
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(item.name)}
            className="w-[100px] h-[100px] rounded-xl justify-center items-center"
            style={network === item.name ? { borderRadius: 10, borderWidth: 5, borderColor: '#F79E1B' } : {}}
          >
            <Image source={item.name} className="w-[80px] h-[80px] rounded-xl" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default NetworkProviders;
