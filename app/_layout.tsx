import React, { useContext, useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import AuthProvider, { AuthContext } from "@/providers/authProvider";
import { RootSiblingParent } from 'react-native-root-siblings';
import "../global.css";
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  const { colorScheme } = useColorScheme();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (error) {
      throw error;
    }

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <RootSiblingParent>
          <Stack
            screenOptions={{
              headerTransparent: true,
              headerShown: false,
            }}
          >
            <Stack.Screen name="(app)" options={{}} />
            <Stack.Screen name="(auth)" options={{}} />
          </Stack>
        </RootSiblingParent>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default RootLayout;
