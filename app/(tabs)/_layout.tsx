import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { MotiView } from "moti";
import { useColorScheme } from "nativewind";

const TabIconStyles = ({ focused, title, Icon }: any) => {
  const { colorScheme } = useColorScheme();
  return (
    <MotiView
      animate={{
        scale: focused ? 1.05 : 1,
      }}
      transition={{ type: "timing", duration: 200 }}
      style={{
        minWidth: 120,
        minHeight: 80,
        borderRadius: 15,
        marginHorizontal: 4,
        backgroundColor: focused
          ? colorScheme === "dark"
            ? "#182848"
            : "#e2e8f0"
          : colorScheme === "dark"
          ? "#09203f"
          : "#fff",
        borderWidth: 1,
        borderColor: focused ? "#e2e8f0" : "transparent",
      }}
    >
      <View className="min-w-[120px] text-slate-200 overflow-hidden w-full min-h-[80px] m-1 h-full flex flex-row justify-center items-center">
        {Icon}
        {!focused && (
          <Text className="dark:text-white text-black text-xl mt-auto mb-auto ml-1">
            {title}
          </Text>
        )}
      </View>
    </MotiView>
  );
};

const _layout = () => {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#09203f",
          borderRadius: 20,
          marginHorizontal: 10,
          marginBottom: insets.bottom > 0 ? insets.bottom + 10 : 20,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderColor: "#09203f",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
          borderWidth: 1,
          borderTopWidth: 1,
        },
        tabBarBackground: () => (
          <BlurView
            intensity={40}
            tint="dark"
            style={{
              flex: 1,
              backgroundColor: "rgba(9, 32, 63, 0.9)",
            }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIconStyles
              focused={focused}
              title="Home"
              Icon={
                <AntDesign
                  name="home"
                  size={24}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIconStyles
              focused={focused}
              title="Search"
              Icon={
                <MaterialCommunityIcons
                  name="book-search-outline"
                  size={24}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIconStyles
              focused={focused}
              title="Profile"
              Icon={
                <AntDesign
                  name="user"
                  size={24}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
              }
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
