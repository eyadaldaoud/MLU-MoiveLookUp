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
    <View className="flex-1 bg-background dark:bg-foreground">
      <SafeAreaProvider>
        <SafeAreaView className="flex-1">
          <ScrollView className="px-4">
            {/* Profile Header */}
            <View className="items-center py-8">
              <View className="bg-secondary/20 p-4 rounded-full">
                <AntDesign
                  name="user"
                  size={50}
                  color={colorScheme === "dark" ? "#94a3b8" : "#475569"}
                />
              </View>
              <Text className="mt-4 text-2xl font-bold">Guest</Text>
              <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Free Account
              </Text>
            </View>

            {/* Settings Section */}
            <View className="space-y-6 py-4">
              {/* App Version Card */}
              <TouchableOpacity className="mb-6">
                <View className="flex-row items-center bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
                  <View className="bg-secondary/10 p-3 rounded-full">
                    <Octicons
                      name="versions"
                      size={24}
                      color={colorScheme === "dark" ? "#94a3b8" : "#475569"}
                    />
                  </View>
                  <View className="ml-4 flex-1">
                    <Text className="text-base font-semibold">App Version</Text>
                    <Text className="text-sm text-gray-500 dark:text-gray-400">
                      1.0.0
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={colorScheme === "dark" ? "#94a3b8" : "#475569"}
                  />
                </View>
              </TouchableOpacity>

              {/* Theme Settings Card */}
              <View className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <View className="bg-secondary/10 p-3 rounded-full">
                      <Ionicons
                        name={colorScheme === "dark" ? "moon" : "sunny"}
                        size={24}
                        color={colorScheme === "dark" ? "#94a3b8" : "#475569"}
                      />
                    </View>
                    <View className="ml-4">
                      <Text className="text-base font-semibold">Theme</Text>
                      <Text className="text-sm text-gray-500 dark:text-gray-400">
                        {colorScheme === "dark" ? "Dark Mode" : "Light Mode"}
                      </Text>
                    </View>
                  </View>
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
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
};

export default Profile;
