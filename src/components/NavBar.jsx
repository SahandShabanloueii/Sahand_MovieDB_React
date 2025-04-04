import { Link } from "react-router-dom";
import { useLanguage } from '../contexts/LanguageContext';

function NavBar() {
    const { language, toggleLanguage } = useLanguage();
    const { translations } = useLanguage();
    const isRTL = language === 'fa';

    return (
        <nav className="bg-darker shadow-lg fixed top-0 w-full z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex ${isRTL ? 'flex-row-reverse' : ''} justify-between items-center h-16`}>
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-netflix-red text-2xl font-bold hover:text-netflix-red-hover transition-colors duration-200">
                            Sahand's MovieDB
                        </Link>
                    </div>
                    <div className={`flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Link 
                            to="/" 
                            className="bg-zinc-900 text-gray-300 hover:text-white py-2 px-3 rounded-md text-lg font-medium transition-colors duration-200 hover:bg-gray-800"
                        >
                            {translations.home}
                        </Link>
                        <Link 
                            to="/favorites" 
                            className="bg-zinc-900 text-gray-300 hover:text-white py-2 px-3 rounded-md text-lg font-medium transition-colors duration-200 hover:bg-gray-800"
                        >
                            {translations.favorites}
                        </Link>
                        <button
                            onClick={toggleLanguage}
                            className="bg-zinc-900 text-gray-300 hover:text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-800"
                            title={language === 'en' ? 'Switch to Persian' : 'Switch to English'}
                        >
                            {language === 'en' ? 'en' : 'fa'}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;