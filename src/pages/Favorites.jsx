import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import { useLanguage } from "../contexts/LanguageContext";

function Favorites() {
    const { favorites } = useMovieContext();
    const { translations } = useLanguage();
    const favsSection = translations.favsSection;

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-7xl mx-auto">
                {favorites.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                        <h2 className="text-2xl font-bold text-white mb-4">{favsSection.noFavorites}</h2>
                        <p className="text-gray-300 text-lg">{favsSection.addFavorites}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {favorites.map(movie => (
                            <div key={movie.id} className="opacity-0 translate-y-5 animate-fadeInUp">
                                <MovieCard movie={movie} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Favorites;