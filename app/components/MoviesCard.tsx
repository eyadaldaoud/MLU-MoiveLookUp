import { FlatList, Image, TouchableOpacity, View } from "react-native";
import React from "react";
import { PopularMovies } from "./Movies";
import Text from "./Text";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";

export default function MoviesCard({ movies }: any) {
  const renderMovie = ({ item }: { item: PopularMovies }) => (
    <TouchableOpacity
      onPress={() => router.push(`/Movies/${item.id}`)}
      key={item.id}
      activeOpacity={0.8}
      className="w-[48%] mb-4"
    >
      <View className="rounded-lg overflow-hidden">
        <Image
          className="w-full h-64"
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          resizeMode="cover"
        />

        <View className="mt-1">
          <Text className="font-bold text-lg">
            {item.title || item.name || "No title"}
          </Text>
          <View className="flex-row items-center mt-1">
            {Array.from({ length: 5 }, (_, index) => {
              const rating = item.vote_average / 2;
              return (
                <Entypo
                  key={index}
                  name={index + 1 <= rating ? "star" : "star-outlined"}
                  size={18}
                  color="#FFD700"
                />
              );
            })}
            <Text className="text-sm ml-2">
              {(item?.vote_average / 2).toFixed(1)}
            </Text>
          </View>
          <Text className="text-sm mt-1">
            {item?.media_type === "tv"
              ? item?.first_air_date?.slice(0, 4)
              : item?.release_date?.slice(0, 4)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={movies}
      renderItem={renderMovie}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      contentContainerStyle={{ padding: 8 }}
      showsVerticalScrollIndicator={false}
    />
  );
}
