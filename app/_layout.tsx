import React, { createContext, useContext, useEffect, useState } from "react";
import { Stack } from "expo-router";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import AuthProvider, { AuthContext } from "@/providers/authProvider"
import { RootSiblingParent } from 'react-native-root-siblings'
import "../global.css"

const RootLayout = () => {
  const { colorScheme } = useColorScheme();
  const {user} = useContext(AuthContext)

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <RootSiblingParent>
      <Stack
      screenOptions={{
        headerTransparent: true,
        headerShown: false
      }}
      >
        <Stack.Screen
         name = '(app)'
        options={{}}
        />
        <Stack.Screen
         name = '(auth)'
        options={{}}
        />
      </Stack>
      </RootSiblingParent>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default RootLayout;
