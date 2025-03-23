import { useState, useEffect } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import { useLanguage } from "../contexts/LanguageContext";
import { getGenres } from "../services/api";
import { Link } from "react-router-dom";
import "../css/MovieCard.css";

function MovieCard({movie}) {
    const { favorites, setFavorites } = useMovieContext();
    const { translations } = useLanguage();
    const [genres, setGenres] = useState([]);
    const [movieGenres, setMovieGenres] = useState([]);

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

    const isFavorite = favorites.some(fav => fav.id === movie.id);

    function onFavoriteClick(e) {
        e.preventDefault(); // Prevent navigation when clicking the favorite button
        if (isFavorite) {
            setFavorites(favorites.filter(fav => fav.id !== movie.id));
        } else {
            setFavorites([...favorites, movie]);
        }
    }

    return (
        <Link to={`/movie/${movie.id}`} className="movie-card">
            <div className="movie-poster">
                <img 
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                    alt={movie.title}
                />
                <div className="movie-overlay">
                    <button 
                        className="favorite-btn"
                        onClick={onFavoriteClick}
                    >
                        {isFavorite ? "❤️" : "🤍"}
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3 className="movie-title">
                    {movie.title}
                </h3>
                <div className="movie-meta">
                    <span className="movie-year">{translations.year}: {movie.release_date?.split("-")[0]}</span>
                    <span className="movie-rating">★ {movie.vote_average.toFixed(1)}</span>
                </div>
                <div className="movie-genres">
                    {movieGenres.slice(0, 3).map(genre => (
                        <span key={genre.id} className="genre-tag">
                            {genre.name}
                        </span>
                    ))}
                    {movieGenres.length > 3 && (
                        <span className="genre-tag">
                            +{movieGenres.length - 3}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default MovieCard;