import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import { useLanguage } from "../contexts/LanguageContext";
function Favorites() {
    const { favorites } = useMovieContext();
    const { translations } = useLanguage();
    const favsSection = translations.favsSection;
    console.log(favsSection);

    return (
        <div className="favorites-container">
            {favorites.length === 0 ? (
                <div className="favorites-empty">
                    <h2>{favsSection.noFavorites}</h2>
                    <p>{favsSection.addFavorites}</p>
                </div>
            ) : (
                <div className="movies-grid">
                    {favorites.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favorites;