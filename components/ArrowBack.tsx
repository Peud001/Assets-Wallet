import { TouchableOpacity } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { router } from 'expo-router';
import { Fontisto } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { Text, View } from './Themed';

const ArrowBack = () => {

    const navigate = useNavigation()
    const {colorScheme} = useColorScheme()

  return (
    <TouchableOpacity
      onPress={() =>
        navigate.canGoBack() ? navigate.goBack() : router.push("home")
      }
    >
      <Fontisto
        name="angle-left"
        size={20}
        color={colorScheme === "light" ? "black" : "white"}
      />
    </TouchableOpacity>
  )
}

export default ArrowBack