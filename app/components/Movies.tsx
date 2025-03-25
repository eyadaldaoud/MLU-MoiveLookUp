import { View } from "react-native";
import React, { useEffect } from "react";
import Text from "./Text";
import MoviesCard from "./MoviesCard";
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

export default function Movies() {
  const [movies, setMovies] = React.useState<PopularMovies[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const FetchMovies = async () => {
    try {
      setLoading(true);
      const url =
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
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
  }, []);

  return (
    <View>
      {loading && (
        <View className="text-2xl justify-center items-center">
          <Text>Loading...</Text>
        </View>
      )}
      {movies && !loading && <MoviesCard movies={movies} />}
    </View>
  );
}
