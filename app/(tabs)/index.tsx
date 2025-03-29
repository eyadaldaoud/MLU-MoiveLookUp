import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Movies from "../components/Movies";

export default function Index() {
  return (
    <View className="flex-1 bg-background dark:bg-foreground dark:text-white text-black">
      <SafeAreaProvider>
        <SafeAreaView className="m-4 h-full">
          <Movies />
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}
