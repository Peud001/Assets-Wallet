import { ScrollView, TouchableOpacity, Image, Switch } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import images from "../../../constants/images";
import { useColorScheme } from "nativewind";
import { firebaseStorage, SignOut } from "@/services/auth";
import { Text, View } from "@/components/Themed";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-root-toast";
import { AuthContext } from "@/providers/authProvider";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { updateProfile } from "firebase/auth";

const Profile = () => {
  const [toggle, setToggle] = useState(false);
  const { colorScheme } = useColorScheme();
  const [imageUri, setImageUri] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const { user, setUser } = useContext(AuthContext);

  const profileDetails = [
    {
      name: "arrow-alt-circle-up",
      title: "Email",
      value: user?.email || "example@gmail.com",
    },
    { name: "phone", title: "Phone", value: "+22 234 2345" },
    {
      name: "vest",
      title: "Privacy",
      value: <FontAwesome6 name="angle-right" size={22} color="#CDCDE0" />,
    },
    {
      name: "clipboard-question",
      title: "Help",
      value: <FontAwesome6 name="angle-right" size={22} color="#CDCDE0" />,
    },
  ];

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await SignOut();
      console.log("Sign out successfully");
    } catch (error) {
      console.log("Failed", error);
      return error;
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedImageUri = result.assets[0].uri;
      setImageUri(selectedImageUri);
      setIsLoading(true);
      try {
        // Converting the image to blob before saving on the database
        const contactImage = await fetch(selectedImageUri);
        const contactImageBlob = await contactImage.blob();
        const storageRef = ref(firebaseStorage, `profileImages/${Date.now()}`);
        // Uploading the image onto the storage
        const uploadedImage = await uploadBytes(storageRef, contactImageBlob);
        const downloadUrl = await getDownloadURL(uploadedImage.ref);

        // Delete the previous image if it exists
        if (user?.photoURL) {
          const previousImageRef = ref(firebaseStorage, user.photoURL);
          await deleteObject(previousImageRef).catch((error) => {
            console.error("Error deleting previous image:", error);
          });
        }

        if (user) {
          await updateProfile(user, {
            photoURL: downloadUrl,
          });
          // Update the local user object with the new photoURL
          setUser({ ...user, photoURL: downloadUrl });
          Toast.show("Profile image updated successfully", {
            duration: Toast.durations.LONG,
          });
        }
      } catch (error) {
        Toast.show("Failed, Please try again", {
          duration: Toast.durations.LONG,
        });
        console.log("Failed", error);
        return error;
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ---- Part 1---- */}
        <View className="px-5 py-8">
          <View className="flex-row justify-between">
            <Text className="text-2xl font-pbold text-gray-400 dark:text-textPrimary">
              Profile
            </Text>
            <TouchableOpacity>
              <FontAwesome6 name="bell" size={22} color='#CDCDE0' />
            </TouchableOpacity>
          </View>
          {/* ---- Part 2---- */}
          <View className="items-center gap-2 py-5">
            <View className="relative w-[108px] h-[108px] ">
              <TouchableOpacity onPress={pickImage} disabled={isLoading}>
                {user?.photoURL ? (
                  <Image
                    source={{ uri: user?.photoURL }}
                    className="w-[100px] h-[100px] self-center mb-4 rounded-full"
                  />
                ) : (
                  <Image
                    source={images.user}
                    className="w-[100px] h-[100px] self-center mb-4 rounded-full"
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={pickImage}
                className="absolute right-0 bottom-0"
              >
                <AntDesign name="edit" size={24} color="#F79E1B" />
              </TouchableOpacity>
            </View>
            <Text className="text-lg font-psemibold">{user?.displayName}</Text>
            <Text className="font-plight">+22 432 4342</Text>
          </View>
          {/* ---- Part 3---- */}
          <View className="gap-7">
            {profileDetails.map((item, index) => (
              <View
                className="flex-row justify-between items-center"
                key={index}
              >
                <View className="flex-row items-center gap-5">
                  <FontAwesome6
                    name={item.name}
                    size={20}
                    color='#CDCDE0'
                  />
                  <Text className="font-bold dark:text-textPrimary">
                    {item.title}
                  </Text>
                </View>
                <Text className="text-gray- dark:text-textPrimary">
                  {item.value}
                </Text>
              </View>
            ))}
            <View className="flex-row justify-between items-center">
              <View className="flex-row gap-5">
                <FontAwesome6
                  name="bell"
                  size={22}
                  color='#CDCDE0'
                />
                <Text className="font-bold dark:text-textPrimary">
                  Notification
                </Text>
              </View>
              <TouchableOpacity onPress={handleToggle}>
                <Switch
                  value={toggle}
                  onValueChange={() => setToggle((prev) => !prev)}
                  trackColor={{ false: "#767577", true: "#F79E1B" }}
                  thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              className="flex-row items-center"
              onPress={handleLogout}
            >
              <FontAwesome
                name="sign-out"
                size={22}
                color='#CDCDE0'
              />
              <Text className="pl-5 font-bold dark:text-textPrimary">
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <StatusBar style={colorScheme === "light" ? "dark" : "light"} />
    </SafeAreaView>
  );
};

export default Profile;
