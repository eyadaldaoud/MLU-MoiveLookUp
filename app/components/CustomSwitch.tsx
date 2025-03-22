import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Animated } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const CustomSwitch = ({
  initialValue = false,
  onValueChange,
  activeColor = "#4CAF50",
  inactiveColor = "#757575",
  onIconName = "lightbulb", // Icon when switch is ON
  offIconName = "lightbulb-outline", // Icon when switch is OFF
}: any) => {
  const [isEnabled, setIsEnabled] = useState(initialValue);
  const translateX = useState(new Animated.Value(initialValue ? 20 : 0))[0];
  const scaleValue = useState(new Animated.Value(1))[0];

  const toggleSwitch = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }

    // Animate the knob movement with a spring effect
    // and add a quick scaling sequence for a bounce-like effect.
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: newValue ? 20 : 0,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.2,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  return (
    <TouchableOpacity
      onPress={toggleSwitch}
      style={[
        styles.container,
        {
          backgroundColor: isEnabled ? activeColor : inactiveColor,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{ translateX }, { scale: scaleValue }],
          },
        ]}
      >
        <MaterialIcons
          name={isEnabled ? onIconName : offIconName}
          size={20}
          color="#000000"
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    padding: 2,
  },
  circle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
});

export default CustomSwitch;
