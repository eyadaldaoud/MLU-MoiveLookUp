import { View } from "react-native";
import React, { useEffect } from "react";
import Text from "./Text";
import MoviesCard from "./MoviesCard";
import { useColorScheme } from "nativewind";
import DropDownPicker from "react-native-dropdown-picker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
export interface PopularMovies {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  name: string;
  original_name: string;
  first_air_date: string;
  media_type: string;
}

const MoviesTypeList = [
  { label: "Popular", value: "popular" },
  { label: "Trending", value: "trending" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Now Playing", value: "now_playing" },
  { label: "Upcoming", value: "upcoming" },
];

export default function Movies() {
  const [movies, setMovies] = React.useState<PopularMovies[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [MoviesType, setMoviesType] = React.useState(MoviesTypeList[0].value);
  const [open, setOpen] = React.useState(false);
  const { colorScheme } = useColorScheme();

  const FetchMovies = async () => {
    try {
      setLoading(true);
      let url;
      if (MoviesType === "trending") {
        url = "https://api.themoviedb.org/3/trending/all/day?language=en-US";
      } else {
        url = `https://api.themoviedb.org/3/movie/${MoviesType}?language=en-US&page=${page}`;
      }
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      setMovies(data.results);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchMovies();
  }, [MoviesType, page]);

  return (
    <View className="">
      {loading && (
        <View className="text-2xl justify-center items-center">
          <Text>Loading....</Text>
        </View>
      )}
      {!loading && movies.length > 0 && (
        <View>
          <Text className="text-2xl font-bold mb-4 text-center">
            {MoviesTypeList.find((e) => e.value === MoviesType)?.label}
          </Text>

          <DropDownPicker
            open={open}
            value={MoviesType}
            items={MoviesTypeList}
            setOpen={setOpen}
            setValue={setMoviesType}
            placeholder="Select Movie Type"
            style={{ marginBottom: 10 }}
            theme={colorScheme === "dark" ? "DARK" : "LIGHT"}
          />
          <View className="flex flex-row justify-center items-center">
            <View className="flex flex-row">
              <Feather
                onPress={() => setPage(1)}
                name="skip-back"
                size={30}
                className="mt-auto mb-auto"
                color={colorScheme === "dark" ? "white" : "black"}
              />
              <MaterialIcons
                onPress={() => {
                  if (page > 1) {
                    setPage(page - 1);
                  }
                }}
                name="navigate-before"
                size={40}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            </View>
            <Text>Page {page}</Text>

            <View className="flex flex-row">
              <MaterialIcons
                onPress={() => setPage(page + 1)}
                name="navigate-next"
                size={40}
                color={colorScheme === "dark" ? "white" : "black"}
              />
              <Feather
                onPress={() => setPage(page + 10)}
                name="skip-forward"
                size={30}
                className="mt-auto mb-auto"
                color={colorScheme === "dark" ? "white" : "black"}
              />
            </View>
          </View>
          <View className="mb-[360px]">
            <MoviesCard movies={movies} />
          </View>
        </View>
      )}
    </View>
  );
}
