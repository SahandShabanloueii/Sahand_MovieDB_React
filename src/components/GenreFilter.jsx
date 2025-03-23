import { useLanguage } from "../contexts/LanguageContext";
import { useState } from "react";
import "../css/GenreFilter.css";

function GenreFilter({ genres, selectedGenres, onGenreChange }) {
    const { translations } = useLanguage();
    const genreNames = translations.genres;
    const [showMore, setShowMore] = useState(false);

    const displayedGenres = showMore ? genres : genres.slice(0, 4);

    return (
        <div className="genre-filter">
            <h2>{translations.filterByGenre}</h2>
            <div className="genre-list">
                {displayedGenres.map(genre => (
                    <button
                        key={genre.id}
                        className={`genre-button ${selectedGenres.includes(genre.id) ? 'selected' : ''}`}
                        onClick={() => onGenreChange(genre.id)}
                    >
                        {genreNames[genre.name.toLowerCase()] || genre.name}
                    </button>
                ))}
                {genres.length > 4 && (
                    <button
                        className="more-options-button"
                        onClick={() => setShowMore(!showMore)}
                    >
                        {showMore ? translations.showLess : translations.showMore}
                    </button>
                )}
            </div>
        </div>
    );
}

export default GenreFilter; 