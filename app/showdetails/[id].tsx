import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  Entypo,
  Ionicons,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";

interface MovieDetailsType {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
  runtime: number;
  genres: { id: number; name: string }[];
  adult: boolean;
  name: string;
  original_name: string;
  first_air_date: string;
  media_type: string;
}

interface VideoResult {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

interface VideoResponse {
  results: VideoResult[];
}

export default function ShowDetails() {
  const { id, type } = useLocalSearchParams(); // Extract type from query params
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { colorScheme } = useColorScheme();

  const fetchMovie = async () => {
    if (!type) return;
    const url = `https://api.themoviedb.org/3/${type}/${id}?language=en-US`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
      },
    };

    try {
      const response = await fetch(url, options);
      const json = await response.json();
      setMovie(json);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const fetchTrailer = async () => {
    if (!type) return;
    const url = `https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
      },
    };

    try {
      const response = await fetch(url, options);
      const json = (await response.json()) as VideoResponse;

      // Look for official trailers first
      const trailer = json.results.find(
        (video) =>
          video.site === "YouTube" &&
          (video.type === "Trailer" || video.type === "Teaser") &&
          video.name.toLowerCase().includes("trailer")
      );

      // If no official trailer found, look for any trailer or teaser
      const fallbackTrailer = json.results.find(
        (video) =>
          video.site === "YouTube" &&
          (video.type === "Trailer" || video.type === "Teaser")
      );

      // Set the trailer key if found
      if (trailer) {
        setTrailerKey(trailer.key);
      } else if (fallbackTrailer) {
        setTrailerKey(fallbackTrailer.key);
      }
    } catch (err) {
      console.error("Error fetching trailer:", err);
    }
  };

  useEffect(() => {
    fetchMovie();
    fetchTrailer();
  }, [id]);

  const openTrailer = () => {
    if (trailerKey) {
      Linking.openURL(`https://www.youtube.com/watch?v=${trailerKey}`);
    } else {
      // If no trailer key is available, search on YouTube
      const searchQuery = encodeURIComponent(
        `${movie?.title || movie?.name || ""} ${
          type === "movie"
            ? movie?.release_date?.slice(0, 4)
            : movie?.first_air_date?.slice(0, 4)
        } trailer`
      );
      Linking.openURL(
        `https://www.youtube.com/results?search_query=${searchQuery}`
      );
    }
  };

  const renderStarRating = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Entypo
        key={index}
        name={index + 1 <= rating ? "star" : "star-outlined"}
        size={20}
        color="#FFD700"
      />
    ));
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-background dark:bg-foreground">
        <Text className="text-white text-lg">Loading...</Text>
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-red-500 text-lg">
          Error loading movie details
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 bg-red-500 p-2 rounded"
        >
          <Text className="text-white">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 dark:bg-foreground bg-background">
      <ScrollView className="flex-1 dark:bg-foreground bg-background">
        <View className="relative">
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
            }}
            className="w-full h-64"
            resizeMode="cover"
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.8)", "black"]}
            className="absolute inset-0"
          />
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-10 left-4 bg-black/100 p-2 rounded-full"
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View className="flex-row px-4 -mt-20 mb-4">
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }}
            className="w-40 h-60 rounded-lg"
            resizeMode="cover"
          />
          <View className="ml-4 flex-1 justify-end">
            <Text
              className="dark:text-white text-black text-2xl font-bold"
              numberOfLines={2}
            >
              {movie.title || movie.name || "No title"}
            </Text>

            <View className="flex-row items-center mt-2">
              {renderStarRating(Math.floor(movie.vote_average / 2))}
              <Text className="dark:text-white text-black ml-2">
                {(movie.vote_average / 2).toFixed(1)}
              </Text>
            </View>
            <View className="flex-row items-center mt-2">
              <MaterialIcons
                name="date-range"
                size={20}
                color={colorScheme === "dark" ? "white" : "black"}
              />

              <Text className="dark:text-white text-black ml-2">
                {type === "movie"
                  ? new Date(movie.release_date).getFullYear()
                  : new Date(movie.first_air_date).getFullYear()}
              </Text>
              <Text className="text-black dark:text-white ml-4">
                {movie.adult ? "18+" : "13+"}
              </Text>
              {type === "movie" && movie.runtime && (
                <>
                  <Text className="text-black dark:text-white ml-4">•</Text>
                  <MaterialIcons
                    name="timer"
                    size={20}
                    color={colorScheme === "dark" ? "white" : "black"}
                  />
                  <Text className="dark:text-white text-black ml-2">
                    {movie.runtime} mins
                  </Text>
                </>
              )}
            </View>

            <TouchableOpacity
              onPress={openTrailer}
              className="flex-row items-center bg-red-600 px-4 py-2 rounded-lg mt-4"
              activeOpacity={0.8}
            >
              <FontAwesome name="youtube-play" size={20} color="white" />
              <Text className="text-white font-bold ml-2">Watch Trailer</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-4 mb-4">
          <View className="flex-row flex-wrap">
            {movie?.genres?.map((genre) => (
              <View
                key={genre.id}
                className="bg-gray-800 px-3 py-1 rounded-full mr-2 mb-2"
              >
                <Text className="text-white text-xs">{genre.name}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="px-4 mb-4">
          <Text className="dark:text-white text-black text-lg font-bold mb-2">
            Synopsis
          </Text>
          <Text className="dark:text-white text-black text-base leading-6">
            {movie.overview}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
