import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import React from "react";
import { PopularMovies } from "./Movies";
import Text from "./Text";

export default function MoviesCard({ movies }: any) {
  return (
    <ScrollView>
      <View className="flex flex-row flex-wrap justify-between w-full px-4">
        {movies.map((movie: PopularMovies) => (
          <TouchableOpacity key={movie.id} className="w-[48%] mb-4">
            <View>
              <Image
                className="w-full h-52 rounded-lg"
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }}
                resizeMode="cover"
              />
              <Text className="text-center mt-auto mb-auto border border-primary rounded p-1 h-14">
                {movie.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
