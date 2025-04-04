import { useState, useEffect } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import { useLanguage } from "../contexts/LanguageContext";
import { getGenres } from "../services/api";
import { Link } from "react-router-dom";

function MovieCard({movie}) {
    const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
    const { translations, language } = useLanguage();
    const [genres, setGenres] = useState([]);
    const [movieGenres, setMovieGenres] = useState([]);
    const genreNames = translations.genres;

    useEffect(() => {
        const loadGenres = async () => {
            try {
                const genresList = await getGenres();
                setGenres(genresList);
                const movieGenresList = genresList.filter(genre => 
                    movie.genre_ids.includes(genre.id)
                );
                setMovieGenres(movieGenresList);
            } catch (error) {
                console.error('Error loading genres:', error);
            }
        };
        loadGenres();
    }, [movie.genre_ids]);

    function onFavoriteClick(e) {
        e.preventDefault(); // Prevent navigation when clicking the favorite button
        if (isFavorite(movie.id)) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie);
        }
    }

    return (
        <Link to={`/movie/${movie.id}`} className="shadow-lg block border-2 border-solid border-dark rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 h-full flex flex-col">
            <div className="relative">
                <img 
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                    alt={movie.title}
                    className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <button 
                        className={`${language === 'fa' ? 'left-2' : 'right-2'} absolute top-2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all duration-300`}
                        onClick={onFavoriteClick}
                    >
                        {isFavorite(movie.id) ? "❤️" : "🤍"}
                    </button>
                </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex-grow">
                    <h3 className="text-white text-lg font-semibold mb-2 line-clamp-2">
                        {movie.title}
                    </h3>
                    <div className="flex justify-between items-center text-gray-400 text-sm mb-2">
                        <span>{translations.year}: {movie.release_date?.split("-")[0]}</span>
                        <span>★ {movie.vote_average.toFixed(1)}</span>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                    {movieGenres.slice(0, 3).map(genre => (
                        <span key={genre.id} className="bg-red-500 bg-opacity-10 text-netflix-red px-2 py-1 rounded-full text-xs">
                            {genreNames[genre.name.toLowerCase()] || genre.name}
                        </span>
                    ))}
                    {movieGenres.length > 3 && (
                        <span className="bg-netflix-red bg-opacity-10 text-netflix-red px-2 py-1 rounded-full text-xs">
                            +{movieGenres.length - 3}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default MovieCard;