import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMovieCredits, getMovieVideos } from "../services/api";
import { useLanguage } from "../contexts/LanguageContext";
import ErrorBoundary from "../components/ErrorBoundary";
import "../css/MovieDetail.css";

function MovieDetail() {
    const { id } = useParams();
    const { translations } = useLanguage();
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadMovieData = async () => {
            try {
                setLoading(true);
                const [movieData, creditsData, videosData] = await Promise.all([
                    getMovieDetails(id),
                    getMovieCredits(id),
                    getMovieVideos(id)
                ]);
                setMovie(movieData);
                setCredits(creditsData);
                setVideos(videosData.results);
            } catch (error) {
                console.error("Error loading movie details:", error);
                setError("Failed to load movie details");
            } finally {
                setLoading(false);
            }
        };

        loadMovieData();
    }, [id]);

    if (loading) {
        return (
            <div className="movie-detail-loading">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (error || !movie) {
        return (
            <div className="movie-detail-error">
                <h2>{error || "Movie not found"}</h2>
            </div>
        );
    }

    const trailer = videos.find(video => video.type === "Trailer" && video.site === "YouTube");
    const releaseYear = movie.release_date?.split("-")[0];
    const runtime = `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`;

    return (
        <ErrorBoundary>
            <div className="movie-detail">
                <div className="movie-header">
                    <div className="movie-poster-image">
                        <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
                    </div>
                    <div className="movie-info">
                        <h1>{movie.title}</h1>
                        <div className="movie-meta">
                            <span>{releaseYear}</span>
                            <span>•</span>
                            <span>{runtime}</span>
                            <span>•</span>
                            <span>★ {movie.vote_average.toFixed(1)}</span>
                        </div>
                        <div className="movie-overview">
                            <p>{movie.overview}</p>
                        </div>
                        <div className="movie-genres">
                            {movie.genres.map(genre => (
                                <span key={genre.id} className="genre-tag">
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                {trailer && (
                    <div className="movie-trailer-section">
                        <h2>{translations.trailer}</h2>
                        <div className="trailer-container">
                            <iframe
                                src={`https://www.youtube.com/embed/${trailer.key}`}
                                title={trailer.name}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                )}
                <div className="movie-cast-section">
                    <h2>{translations.cast}</h2>
                    <div className="cast-list">
                        {credits?.cast.slice(0, 10).map(actor => (
                            <div key={actor.id} className="cast-member">
                                <img 
                                    src={actor.profile_path 
                                        ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                                        : "/placeholder-actor.jpg"
                                    } 
                                    alt={actor.name}
                                />
                                <div className="cast-info">
                                    <span className="cast-name">{actor.name}</span>
                                    <span className="cast-character">{actor.character}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    );
}

export default MovieDetail; 