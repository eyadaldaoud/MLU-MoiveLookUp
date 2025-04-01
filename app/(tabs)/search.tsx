import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { StatusBar } from "expo-status-bar";
import debounce from "lodash/debounce";

interface SearchResult {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  media_type: string;
  overview: string;
}

const Search = () => {
  const { colorScheme } = useColorScheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Debounced search function
  const performSearch = debounce(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
        query
      )}&include_adult=false&language=en-US&page=1`;

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
        },
      };

      const response = await fetch(url, options);
      const json = await response.json();

      // Filter out results without posters and only keep movies & TV shows
      const filteredResults = json.results.filter(
        (item: SearchResult) =>
          item.poster_path &&
          (item.media_type === "movie" || item.media_type === "tv")
      );

      setResults(filteredResults);

      // Add to recent searches if results found
      if (filteredResults.length > 0 && !recentSearches.includes(query)) {
        setRecentSearches((prev) => [query, ...prev.slice(0, 4)]);
      }
    } catch (err) {
      setError("Failed to search. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, 500);

  // Update search results when query changes
  useEffect(() => {
    if (searchQuery) {
      performSearch(searchQuery);
    } else {
      setResults([]);
    }

    return () => {
      performSearch.cancel();
    };
  }, [searchQuery]);

  const handleRecentSearchPress = (query: string) => {
    setSearchQuery(query);
  };

  const navigateToDetails = (item: SearchResult) => {
    router.push({
      pathname: "/showdetails/[id]",
      params: {
        id: item.id,
        type: item.media_type,
      },
    });
  };

  const clearSearch = () => {
    setSearchQuery("");
    setResults([]);
  };

  const renderItem = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity
      className="flex-row p-2 mb-4 rounded-lg overflow-hidden"
      onPress={() => navigateToDetails(item)}
      activeOpacity={0.7}
    >
      <Image
        source={{
          uri: item.poster_path
            ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
            : "https://via.placeholder.com/100x150?text=No+Image",
        }}
        className="w-24 h-36 rounded-lg"
        resizeMode="cover"
      />
      <View className="flex-1 ml-3 justify-center">
        <View className="flex-row items-center">
          <Text
            className="dark:text-white text-black text-base font-bold mb-1"
            numberOfLines={2}
          >
            {item.title || item.name}
          </Text>
          <View className="ml-2 bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">
            <Text className="text-xs text-gray-800 dark:text-gray-300">
              {item.media_type === "movie" ? "Movie" : "TV"}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center mb-2">
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text className="dark:text-gray-300 text-gray-700 text-sm ml-1">
            {item.vote_average ? item.vote_average.toFixed(1) : "N/A"}
          </Text>
          <Text className="dark:text-gray-400 text-gray-600 text-sm ml-4">
            {item.media_type === "movie"
              ? item.release_date
                ? item.release_date.slice(0, 4)
                : "N/A"
              : item.first_air_date
              ? item.first_air_date.slice(0, 4)
              : "N/A"}
          </Text>
        </View>

        <Text
          className="dark:text-gray-400 text-gray-600 text-sm"
          numberOfLines={3}
        >
          {item.overview || "No overview available"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View className="flex-1 justify-center items-center p-4">
      {searchQuery ? (
        <View className="items-center">
          <Ionicons
            name="search-outline"
            size={64}
            color={colorScheme === "dark" ? "#4B5563" : "#9CA3AF"}
          />
          <Text className="dark:text-gray-400 text-gray-500 text-lg mt-4 text-center">
            No results found for "{searchQuery}"
          </Text>
          <Text className="dark:text-gray-500 text-gray-400 text-base mt-2 text-center">
            Try a different search term
          </Text>
        </View>
      ) : (
        <View className="items-center">
          <Ionicons
            name="search"
            size={64}
            color={colorScheme === "dark" ? "#4B5563" : "#9CA3AF"}
          />
          <Text className="dark:text-gray-300 text-gray-700 text-lg mt-4 text-center">
            Search for movies and TV shows
          </Text>

          {recentSearches.length > 0 && (
            <View className="w-full mt-8">
              <Text className="dark:text-gray-300 text-gray-700 text-base font-medium mb-3">
                Recent Searches
              </Text>
              <View className="flex-row flex-wrap">
                {recentSearches.map((search, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleRecentSearchPress(search)}
                    className="bg-gray-200 dark:bg-gray-800 px-3 py-2 rounded-full mr-2 mb-2"
                  >
                    <Text className="dark:text-gray-300 text-gray-700">
                      {search}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView className="dark:bg-foreground bg-background flex-1">
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

      <View className="px-4 py-3">
        <View className="flex-row items-center bg-gray-200 dark:bg-gray-800 rounded-full px-4 py-2">
          <Ionicons
            name="search"
            size={20}
            color={colorScheme === "dark" ? "#9CA3AF" : "#4B5563"}
          />
          <TextInput
            className="flex-1 h-10 ml-2 dark:text-white text-black"
            placeholder="Search movies & TV shows..."
            placeholderTextColor={
              colorScheme === "dark" ? "#9CA3AF" : "#4B5563"
            }
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={clearSearch}>
              <Ionicons
                name="close-circle"
                size={20}
                color={colorScheme === "dark" ? "#9CA3AF" : "#4B5563"}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator
            size="large"
            color={colorScheme === "dark" ? "#FFFFFF" : "#000000"}
          />
          <Text className="dark:text-gray-300 text-gray-700 mt-4">
            Searching...
          </Text>
        </View>
      ) : error ? (
        <View className="flex-1 justify-center items-center p-4">
          <Ionicons name="alert-circle-outline" size={64} color="#EF4444" />
          <Text className="text-red-500 text-lg mt-4 text-center">{error}</Text>
          <TouchableOpacity
            onPress={() => performSearch(searchQuery)}
            className="mt-4 bg-blue-500 px-4 py-2 rounded-lg"
          >
            <Text className="text-white font-medium">Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={results}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.media_type}-${item.id}`}
          contentContainerStyle={{ padding: 16, flexGrow: 1 }}
          ListEmptyComponent={renderEmptyState}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;
