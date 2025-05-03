import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
    return useContext(LanguageContext);
};

export const translations = {
    en: {
        search: "Search movies...",
        searchButton: "Search",
        filterByGenre: "Filter by Genre",
        all: "All",
        genresSelected: "genres selected",
        loading: "Loading...",
        loadingGenres: "Loading genres...",
        viewDetails: "View Details",
        noFavorites: "No favorites yet",
        addFavorites: "Add some movies to your favorites list",
        rating: "Rating",
        year: "Year",
        home: "Home",
        favorites: "Favorites",
        filterByRating: "Filter by Rating",
        filterMovies: "Filter Movies",
        closeFilters: "Close Filters",
        genres: {
            action: "Action",
            adventure: "Adventure",
            animation: "Animation",
            comedy: "Comedy",
            crime: "Crime",
            documentary: "Documentary",
            drama: "Drama",
            family: "Family",
            fantasy: "Fantasy",
            history: "History",
            horror: "Horror",
            music: "Music",
            mystery: "Mystery",
            romance: "Romance",
            'science fiction': "Science Fiction",
            'tv movie': "TV Movie",
            thriller: "Thriller",
            war: "War",
            western: "Western"
        },
        favsSection: {
            noFavorites: "No favorites yet",
            addFavorites: "Add some movies to your favorites list"
        },
        showMore: "⇩ Show More ⇩",
        showLess: "⇧ Show Less ⇧",
        filterByYear: "Filter by Year",
        from: "From",
        to: "To"
    },
    fa: {
        search: "جستجوی فیلم...",
        searchButton: "جستجو",
        filterByGenre: "فیلتر بر اساس ژانر",
        all: "همه",
        genresSelected: "ژانر انتخاب شده",
        loading: "در حال بارگذاری...",
        loadingGenres: "در حال بارگذاری ژانرها...",
        viewDetails: "مشاهده جزئیات",
        noFavorites: "هنوز مورد علاقه‌ای وجود ندارد",
        addFavorites: "فیلم‌هایی را به لیست مورد علاقه خود اضافه کنید",
        rating: "امتیاز",
        year: "سال",
        home: "خانه",
        favorites: "مورد علاقه‌ها",
        filterByRating: "فیلتر بر اساس امتیاز",
        filterMovies: "فیلتر فیلم‌ها",
        closeFilters: "بستن فیلترها",
        genres: {
            action: "اکشن",
            adventure: "ماجراجویی",
            animation: "انیمیشن",
            comedy: "کمدی",
            crime: "جنایی",
            documentary: "مستند",
            drama: "درام",
            family: "خانوادگی",
            fantasy: "فانتزی",
            history: "تاریخی",
            horror: "ترسناک",
            music: "موزیکال",
            mystery: "معمایی",
            romance: "عاشقانه",
            'science fiction': "علمی تخیلی",
            'tv movie': "فیلم تلویزیونی",
            thriller: "هیجان‌انگیز",
            war: "جنگی",
            western: "وسترن",
        },
        favsSection: {
            noFavorites: "هیچ مورد علاقه‌ای وجود ندارد",
            addFavorites: "فیلم‌هایی را به لیست مورد علاقه خود اضافه کنید"
        },
        showMore: "⇩ نمایش بیشتر ⇩",
        showLess: "⇧ نمایش کمتر ⇧",
        filterByYear: "فیلتر بر اساس سال",
        from: "از",
        to: "تا"
    }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        const savedLang = localStorage.getItem('language');
        return savedLang || 'en';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
        document.dir = language === 'fa' ? 'rtl' : 'ltr';
    }, [language]);

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'fa' : 'en');
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, translations: translations[language] }}>
            {children}
        </LanguageContext.Provider>
    );
}; 