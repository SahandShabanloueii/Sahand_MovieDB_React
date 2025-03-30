import MovieCard from "../components/MovieCard";
import GenreFilter from "../components/GenreFilter";
import YearRangeFilter from "../components/YearRangeFilter";
import { useState, useEffect } from "react";
import { getPopularMovies, searchMovies, getMoviesByGenre, getGenres, getMoviesByYearRange, getMoviesByGenreAndYear } from "../services/api";
import { useLanguage } from "../contexts/LanguageContext";
import ErrorBoundary from "../components/ErrorBoundary";

function Home() {
    const { translations } = useLanguage();
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [yearRange, setYearRange] = useState({
        start: new Date().getFullYear() - 10,
        end: new Date().getFullYear()
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const genresData = await getGenres();
                setGenres(genresData);
                await loadMovies();
            } catch (error) {
                console.error("Error loading initial data:", error);
                setError("Failed to load data");
            } finally {
                setLoading(false);
            }
        };
        loadInitialData();
    }, []);

    useEffect(() => {
        loadMovies();
    }, [currentPage, selectedGenres, yearRange]);

    const loadMovies = async () => {
        try {
            setLoading(true);
            let response;
            
            console.log('Loading movies with:', {
                searchQuery,
                selectedGenres,
                yearRange,
                currentPage
            });
            
            if (searchQuery) {
                response = await searchMovies(searchQuery, currentPage);
            } else if (selectedGenres.length > 0) {
                if (yearRange.start !== yearRange.end) {
                    response = await getMoviesByGenreAndYear(
                        selectedGenres.join(","),
                        yearRange.start,
                        yearRange.end,
                        currentPage
                    );
                } else {
                    response = await getMoviesByGenre(selectedGenres.join(","), currentPage);
                }
            } else if (yearRange.start !== yearRange.end) {
                response = await getMoviesByYearRange(
                    yearRange.start,
                    yearRange.end,
                    currentPage
                );
            } else {
                response = await getPopularMovies(currentPage);
            }

            console.log('Movies loaded:', response.results.length);
            setMovies(response.results);
            setTotalPages(response.total_pages);
            setError(null);
        } catch (error) {
            console.error("Error loading movies:", error);
            setError("Failed to load movies");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        loadMovies();
    };

    const handleGenreChange = (genreId) => {
        console.log('Genre clicked:', genreId);
        setSelectedGenres(prev => {
            const newGenres = prev.includes(genreId)
                ? prev.filter(id => id !== genreId)
                : [...prev, genreId];
            console.log('New selected genres:', newGenres);
            setCurrentPage(1);
            return newGenres;
        });
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleYearRangeChange = (newRange) => {
        setYearRange(newRange);
        setCurrentPage(1);
    };

    return (
        <ErrorBoundary>
            <div className="min-h-screen bg-background p-8 md:p-4">
                <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-[300px] lg:flex-shrink-0">
                        <GenreFilter
                            genres={genres}
                            selectedGenres={selectedGenres}
                            onGenreChange={handleGenreChange}
                        />
                        <YearRangeFilter
                            selectedRange={yearRange}
                            onYearRangeChange={handleYearRangeChange}
                        />
                    </div>
                    <div className="flex-grow">
                        <div className="mb-8">
                            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={translations.search}
                                    className="flex-1 bg-gray-800 border-none px-5 py-3 rounded-md text-white text-base transition-all duration-300 ease-in-out focus:outline-none focus:bg-gray-700 focus:ring-2 focus:ring-netflix-red"
                                />
                                <button 
                                    type="submit" 
                                    className="bg-netflix-red text-white px-6 py-3 rounded-md text-base transition-all duration-300 ease-in-out hover:bg-netflix-red-hover hover:-translate-y-0.5 md:w-auto w-full"
                                >
                                    {translations.searchButton}
                                </button>
                            </form>
                        </div>

                        {loading ? (
                            <div className="flex justify-center items-center min-h-[400px]">
                                <div className="w-12 h-12 border-4 border-gray-800 border-t-netflix-red rounded-full animate-spin"></div>
                            </div>
                        ) : error ? (
                            <div className="flex justify-center items-center min-h-[50vh]">
                                <div className="text-netflix-red text-xl text-center">{error}</div>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 py-4">
                                    {movies.map((movie) => (
                                        <div key={movie.id} className="opacity-0 translate-y-5 animate-fadeInUp">
                                            <MovieCard movie={movie} />
                                        </div>
                                    ))}
                                </div>

                                {totalPages > 1 && (
                                    <div className="flex justify-center items-center gap-4 mt-8 p-4">
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="bg-netflix-red text-white px-4 py-2 rounded-md transition-colors duration-300 ease-in-out hover:bg-netflix-red-hover disabled:bg-gray-600 disabled:cursor-not-allowed"
                                        >
                                            Previous
                                        </button>
                                        <span className="text-white text-base">
                                            Page {currentPage} of {totalPages}
                                        </span>
                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className="bg-netflix-red text-white px-4 py-2 rounded-md transition-colors duration-300 ease-in-out hover:bg-netflix-red-hover disabled:bg-gray-600 disabled:cursor-not-allowed"
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    );
}

export default Home;