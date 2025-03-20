import { Button, Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl m-4 text-primary">
        <Button title="Press me s" />
      </Text>
    </View>
  );
}
