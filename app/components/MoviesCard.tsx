import { FlatList, Image, TouchableOpacity, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient"; // For gradient overlay
import { PopularMovies } from "./Movies";
import Text from "./Text";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";

export default function MoviesCard({ movies }: any) {
  const renderMovie = ({ item }: { item: PopularMovies }) => (
    <TouchableOpacity
      onPress={() => {
        router.push(`/Movies/${item.id}`);
      }}
      key={item.id}
      className="w-[48%] mb-4"
    >
      <View className="relative">
        <Image
          className="w-full h-64 rounded-lg"
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          resizeMode="stretch"
        />
        <View className="absolute bottom-0 w-full">
          <LinearGradient
            start={[0, 0.5]}
            end={[1, 0.5]}
            colors={["#4b6cb7", "#182848"]}
          >
            <View className="p-1">
              <Text className="text-white text-center font-bold text-md">
                {item.title || "No title"}
              </Text>
              <View className="flex-row justify-center items-center mt-1">
                {Array.from({ length: 5 }, (_, index) => {
                  const rating = item.vote_average / 2;
                  return (
                    <Entypo
                      key={index}
                      name={index + 1 <= rating ? "star" : "star-outlined"}
                      size={16}
                      color="#FFD700"
                    />
                  );
                })}
                <Text className="text-white text-sm ml-2">
                  {(item?.vote_average / 2).toFixed(1)}
                </Text>
              </View>
              <Text className="text-center mt-2 text-white text-sm ml-2">
                {item?.release_date.slice(0, 4)}
              </Text>
            </View>
          </LinearGradient>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={movies}
        renderItem={renderMovie}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ padding: 8 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
