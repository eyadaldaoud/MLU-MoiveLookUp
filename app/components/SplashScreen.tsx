import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Dimensions, Image } from "react-native";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]);

    animation.start(({ finished }) => {
      if (finished) {
        // Add a small delay after animation completes for better UX
        setTimeout(() => {
          router.replace("/(tabs)");
        }, 500);
      }
    });

    return () => {
      animation.stop();
    };
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }, { rotate: spin }],
          },
        ]}
      >
        <View style={styles.logoWrapper}>
          <Image
            source={require("../../assets/images/app-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1B2E", // Modern dark purple background
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoWrapper: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.25,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "100%",
    height: "100%",
    borderRadius: width * 0.2,
  },
});
