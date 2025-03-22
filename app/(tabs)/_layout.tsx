import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const TabIconStyles = ({ focused, title, Icon }: any) => {
  if (focused) {
    return (
      <LinearGradient
        colors={["#4b6cb7", "#182848"]}
        style={{ borderRadius: 40 }}
      >
        <View className="min-w-[110px] overflow-hidden w-full min-h-[80px] m-1 h-full flex flex-row justify-center items-center">
          {Icon}
        </View>
      </LinearGradient>
    );
  } else {
    return (
      <LinearGradient
        colors={["#09203f", "#09203f"]}
        end={[1, 0.5]}
        start={[0, 0.5]}
        style={{ borderRadius: 20 }}
      >
        <View className="min-w-[110px] overflow-hidden w-full min-h-[80px] m-1 h-full flex flex-row justify-center items-center">
          {Icon}
          <Text className="text-white text-xl mt-auto mb-auto ml-1">
            {title}
          </Text>
        </View>
      </LinearGradient>
    );
  }
};

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#09203f",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderColor: "#09203f",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <TabIconStyles
                focused={focused}
                title={"Home"}
                Icon={<AntDesign name="home" size={24} color="white" />}
              />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <TabIconStyles
                focused={focused}
                title={"Saved"}
                Icon={
                  <MaterialCommunityIcons
                    name="bookmark-outline"
                    size={24}
                    color="white"
                  />
                }
              />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "profile",
          headerShown: false,

          tabBarIcon: ({ focused }) => (
            <>
              <TabIconStyles
                focused={focused}
                title={"Profile"}
                Icon={<AntDesign name="user" size={24} color="white" />}
              />
            </>
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
