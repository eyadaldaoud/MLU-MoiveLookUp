import { View } from "react-native";
import React, { useEffect } from "react";
import Text from "./Text";
import MoviesCard from "./MoviesCard";
import { SelectCountry } from "react-native-element-dropdown";
import { useColorScheme } from "nativewind";

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
}
const MoviesTypeList = [
  {
    value: "popular",
    lable: "Popular",
  },
  {
    value: "top_rated",
    lable: "Top Rated",
  },
  {
    value: "now_playing",
    lable: "Now Playing",
  },
  {
    value: "upcoming",
    lable: "Upcoming",
  },
];
export default function Movies() {
  const [movies, setMovies] = React.useState<PopularMovies[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [MoviesType, setMoviesType] = React.useState("popular");
  const { colorScheme } = useColorScheme();
  const FetchMovies = async () => {
    try {
      setLoading(true);
      const url =
        `https://api.themoviedb.org/3/movie/${MoviesType}?language=en-US&page=` +
        page;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDQyYTg4YWQ0YmVjYTUzY2MzMGM0NWMwZWJlYWM0NCIsIm5iZiI6MTc0Mjg0ODU3MC43NDUsInN1YiI6IjY3ZTFjMjNhMGVlNTNkNGU3MWYwNGVmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xl-tHKtC7X8vYfzniyWqQu-QNqtubtkhYrh-_eF-RUM",
        },
      };
      await fetch(url, options)
        .then((response) => response.json())
        .then((response) => {
          setMovies(response.results);
        })
        .catch((err) => {
          setError(err);
        });
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    FetchMovies();
  }, [MoviesType]);

  return (
    <View>
      {loading && (
        <View className="text-2xl justify-center items-center">
          <Text>Loading....</Text>
        </View>
      )}
      {movies && !loading && (
        <View>
          <Text className="text-2xl font-bold mb-4 text-center">
            {MoviesTypeList.find((e) => e.value === MoviesType)?.lable}
          </Text>
          <SelectCountry
            style={{
              width: "100%",
              height: 50,
              backgroundColor: colorScheme === "dark" ? "#0000" : "#fff",
              borderRadius: 8,
              borderColor: "#ccc",
            }}
            selectedTextStyle={{
              backgroundColor: colorScheme === "dark" ? "#0000" : "#fff",
              color: colorScheme === "dark" ? "#fff" : "#000",
              padding: 10,
            }}
            placeholderStyle={{
              color: colorScheme === "dark" ? "#fff" : "#000",
              backgroundColor: colorScheme === "dark" ? "#0000" : "#fff",
            }}
            maxHeight={200}
            value={MoviesType}
            data={MoviesTypeList}
            valueField="value"
            labelField="lable"
            imageField="image"
            placeholder="Select movie type"
            onChange={(e) => {
              setMoviesType(e.value);
            }}
          />
          <MoviesCard movies={movies} />
        </View>
      )}
    </View>
  );
}
