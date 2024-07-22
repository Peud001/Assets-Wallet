import React from "react";
import { Stack } from "expo-router";
import { apiSlice } from "../../features/slice/apiSlice";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/features/store/store";

const UserLayout = () => {
  return (
     <ReduxProvider store={store}>
      <Stack
        screenOptions={{
          headerTransparent: true,
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="sendMoney" options={{ headerShown: false }} />
        <Stack.Screen name="topUp" options={{ headerShown: false }} />
      </Stack>
    </ReduxProvider>
  );
};

export default UserLayout;
