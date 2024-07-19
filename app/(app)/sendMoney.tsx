import {
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Button from "@/components/Button";
import { router } from "expo-router";
import { useGetContactsQuery } from "@/features/slice/apiSlice";
import images from "@/constants/images";
import KeyPad from "@/components/keyPad";
import { Text, View } from "@/components/Themed";
import { addDoc, collection } from "firebase/firestore";
import { firebaseDb } from "@/services/auth";

type ContactType = {
  image: string;
  firstName: string;
  lastName: string;
  accountNumber: string;
};

const SendMoney = () => {
  const navigate = useNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [amount, setAmount] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [beneficiary, setBeneficiary] = useState<ContactType | null>(null);
  const [showModel, setShowModel] = useState(false);

  const { data, error, isLoading } = useGetContactsQuery()

  const currentDate = new Date()
  const day = currentDate.getDate()
  const month = currentDate.getMonth() + 1
  const year = currentDate.getFullYear()
  const formattedDateManual = `${day}-${month}-${year}`
  const timeString = currentDate.toLocaleTimeString();

  const handleSubmit = async () => {
    if (amount === "" || beneficiary === null) return;
    try {
      setIsSubmitting(true);
      await addDoc(collection(firebaseDb, "statData"), {firstName: beneficiary.firstName, lastName: beneficiary.lastName, bank: beneficiary.accountNumber, image: beneficiary.image, amount: amount, date: formattedDateManual, time: timeString});
      setTimeout(() => {
        setIsSubmitting(false);
        setShowModel(true);
      }, 3000);
    } catch (err) {
      console.log("failed");
      setIsSubmitting(false);
    }
  };

  const handlePress = (data: string) => {
    if (data === "delete") {
      setAmount(amount.slice(0, -1));
    } else if (data === "." && amount.includes(".")) {
      return;
    } else {
      setAmount(amount + data);
    }
  };

  const toggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  const handleSelect = (item: ContactType) => {
    setBeneficiary(item);
    setIsVisible(!isVisible);
  };

  const renderDropdown = () => {
    if (isVisible) {
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="top-[130px] px-3 absolute h-[70%] bg-white w-full rounded-2x self-center border border-[#e0e0e0] rounded-2xl"
          style={{ zIndex: 1000 }}
        >
          <View className="py-2">
            {data &&
              data.map((item) => (
                <TouchableOpacity
                  onPress={() => handleSelect(item)}
                  key={item.id}
                  className="flex-row items-center py-2 "
                >
                  <Image
                    source={{ uri: item.image }}
                    className="w-[40px] h-[40px] rounded-full"
                  />
                  <View className="pl-3">
                    <Text className="font-bold text-[16px]">
                      {item.firstName} {item.lastName}
                    </Text>
                    <Text className="text-[#b0b0b0]">
                      Bank - {item.accountNumber}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        </ScrollView>
      );
    }
  };

  const formatDate = (date: any) => {
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options).replace(",", "");
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Modal animationType="slide" transparent={true} visible={showModel}>
          <View className="flex-1 justify-center items-center bg-white bg-[#00000090]">
            <View className="bg-white p-5 rounded-lg w-[90%]">
              <TouchableOpacity
                disabled={isLoading}
                className="items-end"
                onPress={() => {
                  setShowModel(false);
                  setBeneficiary(null);
                  setAmount("");
                }}
              >
                <AntDesign name="closecircleo" size={28} color="black" />
              </TouchableOpacity>
              <View className="items-center my-5">
                <Feather name="check-circle" size={50} color="green" />
                <Text className="mt-5 font-bold text-xl">
                  Transfer Successful
                </Text>
                <Text className="text-[#a0a0a0]">
                  Your money has been transfered successfully
                </Text>
              </View>
              <View className="flex-row justify-between my-5">
                <Text className="text-[#a0a0a0]">Transfer Amount</Text>
                <Text className="font-bold">
                  ${parseFloat(amount).toFixed(2)}
                </Text>
              </View>
              <View className="mb-5 border border-[#e0e0e0] p-2 rounded-2xl">
                {beneficiary != null && (
                  <View className="flex-row items-center">
                    <Image
                      source={{ uri: beneficiary.image }}
                      className="w-[40px] h-[40px] rounded-full"
                    />
                    <View className="pl-3">
                      <Text className="font-bold text-[16px]">
                        {beneficiary.firstName} {beneficiary.lastName}
                      </Text>
                      <Text className="text-[#b0b0b0]">
                        Bank - {beneficiary.accountNumber}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
              <View className="flex-row justify-between">
                <Text className="text-[#a0a0a0]">Date & time</Text>
                <Text>{formatDate(new Date())}</Text>
              </View>
            </View>
          </View>
        </Modal>

        <LinearGradient
          colors={["#290067", "#4600AC"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              paddingVertical: 36,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                navigate.canGoBack()
                  ? navigate.goBack()
                  : router.replace("home")
              }
            >
              <FontAwesome name="angle-left" color="#fff" size={24} />
            </TouchableOpacity>
            <Text
              style={{
                color: "white",
                fontSize: 24,
                fontWeight: "bold",
                textAlign: "center",
                flex: 1,
              }}
            >
              Send Money
            </Text>
          </View>
        </LinearGradient>
        <View className="px-3 bg-white">
          {renderDropdown()}
          <View className="pt-[36px]">
            <Text className="text-[#c0c0c0] font-bold m-1">
              Select a beneficiary
            </Text>
            <View>
              <TouchableOpacity
                onPress={toggleDropdown}
                className="border border-[#e0e0e0] h-[60px] flex-row items-center p-2 rounded-2xl"
              >
                <Image
                  source={
                    beneficiary ? { uri: beneficiary.image } : images.user
                  }
                  className="w-[40px] h-[40px] rounded-full"
                />
                <View className="pl-3 w-[90%] flex-row items-center justify-between">
                  <View>
                    <Text className="font-bold text-[16px]">
                      {beneficiary
                        ? `${beneficiary.firstName} ${beneficiary.lastName}`
                        : "John Doe"}
                    </Text>
                    <Text className="text-[#b0b0b0]">
                      Bank -{" "}
                      {beneficiary ? beneficiary.accountNumber : "xxxxxxxxxx"}
                    </Text>
                  </View>
                  <AntDesign
                    name={isVisible ? "up" : "down"}
                    size={20}
                    color="black"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View className="mt-7 items-center w-full">
            <Text className="font-bold text-3xl w-full text-center">
              $ {amount ? parseFloat(amount).toFixed(2) : "0.00"}
            </Text>
          </View>
          <View className="pt-7">
            <KeyPad onPress={handlePress} />
            <Button handleSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SendMoney;
