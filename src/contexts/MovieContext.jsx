import { createContext , useState , useContext , useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => {
    return useContext(MovieContext);
}

export const MovieProvider = ({children}) => {
    // Initialize favorites from localStorage
    const [favorites, setFavorites] = useState(() => {
        const storedFavs = localStorage.getItem("favorites");
        return storedFavs ? JSON.parse(storedFavs) : [];
    });
    
    // Update localStorage whenever favorites change
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (movie) => {
        setFavorites((prev) => {
            // Check if movie is already in favorites
            if (prev.some(fav => fav.id === movie.id)) {
                return prev;
            }
            return [...prev, movie];
        });
    }

    const removeFromFavorites = (movieId) => {
        setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
    }

    const isFavorite = (movieId) => {
        return favorites.some((movie) => movie.id === movieId);
    }

    const value = {
        favorites,
        setFavorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    };

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
}