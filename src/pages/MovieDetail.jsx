import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMovieCredits, getMovieVideos } from "../services/api";
import { useLanguage } from "../contexts/LanguageContext";
import ErrorBoundary from "../components/ErrorBoundary";

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
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-gray-800 border-t-netflix-red rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !movie) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <h2 className="text-netflix-red text-2xl">{error || "Movie not found"}</h2>
            </div>
        );
    }

    const trailer = videos.find(video => video.type === "Trailer" && video.site === "YouTube");
    const releaseYear = movie.release_date?.split("-")[0];
    const runtime = `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`;

    return (
        <ErrorBoundary>
            <div className="min-h-screen bg-background py-8 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/3 h-full">
                            <div className="sticky top-24">
                                <img 
                                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                                    alt={movie.title}
                                    className="w-full rounded-lg shadow-lg object-cover"
                                />
                            </div>
                        </div>
                        <div className="md:w-2/3">
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{movie.title}</h1>
                            <div className="flex flex-wrap items-center gap-4 text-gray-300 mb-6">
                                <span>{releaseYear}</span>
                                <span>•</span>
                                <span>{runtime}</span>
                                <span>•</span>
                                <span>★ {movie.vote_average.toFixed(1)}</span>
                            </div>
                            <div className="text-gray-300 mb-6">
                                <p className="text-lg leading-relaxed">{movie.overview}</p>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {movie.genres.map(genre => (
                                    <span 
                                        key={genre.id} 
                                        className="bg-netflix-red bg-opacity-20 text-netflix-red px-3 py-1 rounded-full text-sm"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {trailer && (
                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-white mb-6">{translations.trailer}</h2>
                            <div className="relative pt-[56.25%]">
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                                    src={`https://www.youtube.com/embed/${trailer.key}`}
                                    title={trailer.name}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    )}

                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-white mb-6">{translations.cast}</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {credits?.cast.slice(0, 10).map(actor => (
                                <div key={actor.id} className="bg-dark-gray rounded-lg overflow-hidden">
                                    <img 
                                        src={actor.profile_path 
                                            ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                                            : "/placeholder-actor.jpg"
                                        } 
                                        alt={actor.name}
                                        className="w-full h-auto object-cover"
                                    />
                                    <div className="p-3">
                                        <div className="text-white font-medium">{actor.name}</div>
                                        <div className="text-gray-400 text-sm">{actor.character}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    );
}

export default MovieDetail; 