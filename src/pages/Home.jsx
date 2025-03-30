import MovieCard from "../components/MovieCard";
import GenreFilter from "../components/GenreFilter";
import YearRangeFilter from "../components/YearRangeFilter";
import { useState, useEffect } from "react";
import { getPopularMovies, searchMovies, getMoviesByGenre, getGenres, getMoviesByYearRange, getMoviesByGenreAndYear } from "../services/api";
import { useLanguage } from "../contexts/LanguageContext";
import ErrorBoundary from "../components/ErrorBoundary";
import "../css/Home.css";

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
            <div className="home-container">
                <div className="content-wrapper">
                    <div className="sidebar">
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
                    <div className="main-content">
                        <div className="search-section">
                            <form onSubmit={handleSearch}>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={translations.search}
                                    className="search-input"
                                />
                                <button type="submit" className="search-button">
                                    {translations.searchButton}
                                </button>
                            </form>
                        </div>

                        {loading ? (
                            <div className="loading-spinner"></div>
                        ) : error ? (
                            <div className="error-message">{error}</div>
                        ) : (
                            <>
                                <div className="movie-grid">
                                    {movies.map((movie) => (
                                        <MovieCard key={movie.id} movie={movie} />
                                    ))}
                                </div>

                                {totalPages > 1 && (
                                    <div className="pagination">
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="pagination-button"
                                        >
                                            Previous
                                        </button>
                                        <span className="page-info">
                                            Page {currentPage} of {totalPages}
                                        </span>
                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className="pagination-button"
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