import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useColorScheme } from "nativewind";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CustomSwitch from "../components/CustomSwitch";
import Text from "../components/Text";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Octicons from "@expo/vector-icons/Octicons";

const Profile = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View className="flex-1  bg-background dark:bg-foreground">
      <SafeAreaProvider>
        <SafeAreaView className="m-4 h-full">
          <ScrollView>
            <View className="flex-1 justify-center items-center">
              <AntDesign
                name="user"
                size={40}
                color="gray"
                className="rounded-full border-2 border-slate-500 p-2"
              />

              <Text className="mt-4 text-xl font-bold">Guest</Text>
            </View>
            {/* <View
              className="flex flex-row mt-10 items-start border-2
           border-secondary  p-4 rounded-full"
            >
              <Text className="mt-auto mb-auto ml-2 p-4 font-bold">
                Account
              </Text>
              <Ionicons
                name="settings-outline"
                size={24}
                color={colorScheme === "dark" ? "white" : "black"}
                className="ml-auto mt-auto mb-auto mr-2"
              />
            </View> */}
            <TouchableOpacity>
              <View
                className="flex flex-row mt-4 items-start border-2
           border-secondary  p-4 rounded-full"
              >
                <Text className="mt-auto mb-auto ml-2 p-4 font-bold">
                  App Version : 1.0
                </Text>
                <Octicons
                  name="versions"
                  size={24}
                  color={colorScheme === "dark" ? "white" : "black"}
                  className="ml-auto mt-auto mb-auto mr-2"
                />
              </View>
            </TouchableOpacity>
            <View className="min-h-[0px]" />
            <View
              className="flex flex-row mt-4 mb-4 items-start border-2
           border-secondary rounded-full p-4"
            >
              <Text className="mt-auto mb-auto ml-2 font-bold">
                Color Scheme: {colorScheme === "dark" ? "Dark" : "Light"}
              </Text>
              <View className="ml-auto">
                <CustomSwitch
                  initialValue={colorScheme}
                  onValueChange={toggleColorScheme}
                  activeColor="#1e293b"
                  inactiveColor="#cbd5e1"
                  onIconName="dark-mode"
                  offIconName="light-mode"
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
};

export default Profile;
