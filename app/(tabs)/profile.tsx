import {
  View,
  Switch,
  Image,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import React from "react";
import { useColorScheme } from "nativewind";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CustomSwitch from "../components/CustomSwitch";
import Text from "../components/Text";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

const Profile = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View className="flex-1  bg-white dark:bg-slate-950">
      <SafeAreaProvider>
        <SafeAreaView className="m-4 h-full">
          <ScrollView>
            <View className="flex-1 justify-center items-center">
              <Image
                source={require("../../assets/images/avatar.png")}
                className="w-20 h-20 rounded-full"
              />
              <Text className="mt-4 ml-2">User242412</Text>
            </View>
            <View
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
            </View>

            <View className="min-h-[310px]" />
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
            <TouchableHighlight
              onPress={() => {}}
              activeOpacity={0.8}
              underlayColor={"transparent"}
            >
              <View
                className="flex flex-row items-start border-2
           border-rose-600 rounded-full p-2 mt-auto"
              >
                <Text className="font-bold mt-auto mb-auto ml-2 p-4 dark:text-rose-600 text-rose-800">
                  SignOut
                </Text>
                <AntDesign
                  name="arrowright"
                  size={24}
                  color={colorScheme === "dark" ? "red" : "red"}
                  className="ml-auto mt-auto mb-auto mr-2"
                />
              </View>
            </TouchableHighlight>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
};

export default Profile;
