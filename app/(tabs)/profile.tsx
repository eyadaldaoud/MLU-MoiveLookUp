import { View, Text, Switch } from "react-native";
import React from "react";
import { useColorScheme } from "nativewind";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomSwitch from "../components/CustomSwitch";

const profile = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View className="flex-1 justify-center items-center bg-white dark:bg-black">
      <SafeAreaProvider>
        <SafeAreaView>
          <CustomSwitch
            initialValue={false}
            onValueChange={toggleColorScheme}
            activeColor="#4CAF50"
            inactiveColor="#757575"
            onIconName="dark-mode"
            offIconName="light-mode"
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
};

export default profile;
