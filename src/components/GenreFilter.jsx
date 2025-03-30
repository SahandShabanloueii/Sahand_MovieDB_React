import { useLanguage } from "../contexts/LanguageContext";
import { useState } from "react";

function GenreFilter({ genres, selectedGenres, onGenreChange }) {
    const { translations } = useLanguage();
    const genreNames = translations.genres;
    const [showMore, setShowMore] = useState(false);

    const displayedGenres = showMore ? genres : genres.slice(0, 4);

    return (
        <div className="bg-dark-gray p-6 rounded-lg">
            <h2 className="text-white text-xl font-semibold mb-4">{translations.filterByGenre}</h2>
            <div className="flex flex-col gap-2">
                {displayedGenres.map(genre => (
                    <button
                        key={genre.id}
                        className={`px-4 py-2 rounded-md text-left transition-all duration-200 ${
                            selectedGenres.includes(genre.id)
                                ? 'bg-netflix-red text-white hover:bg-netflix-red-hover'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                        onClick={() => onGenreChange(genre.id)}
                    >
                        {genreNames[genre.name.toLowerCase()] || genre.name}
                    </button>
                ))}
                {genres.length > 4 && (
                    <button
                        className="mt-2 text-netflix-red hover:text-netflix-red-hover text-sm font-medium transition-colors duration-200"
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