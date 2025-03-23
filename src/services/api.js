const API_KEY = "Your_api_key";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async (page = 1) => {
    const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    return response.json();
};

export const searchMovies = async (query, page = 1) => {
    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`
    );
    return response.json();
};

export async function getGenres() {
    const response = await fetch(
        `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();
    return data.genres;
}

export const getMoviesByGenre = async (genreId, page = 1) => {
    const response = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genreId}&page=${page}`
    );
    return response.json();
};
  

export async function getMovieDetails(movieId) {
    const response = await fetch(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=credits,videos`
    );
    const data = await response.json();
    return data;
}

export async function getMovieCredits(movieId) {
    const response = await fetch(
        `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();
    return data;
}

export async function getMovieVideos(movieId) {
    const response = await fetch(
        `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();
    return data;
}