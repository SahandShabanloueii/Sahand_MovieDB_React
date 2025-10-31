import { Link } from "react-router-dom";
import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect } from 'react';

function NavBar() {
    const { language, toggleLanguage } = useLanguage();
    const { translations } = useLanguage();
    const isRTL = language === 'fa';
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setIsAtTop(window.scrollY === 0);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={` shadow-lg fixed z-10 transition-all ease-in-out duration-300 ${
            isAtTop 
                ? 'top-0 w-full left-0 right-0 bg-darker' 
                : 'top-2 left-4 right-4 rounded-3xl bg-darker/70 backdrop-blur-md'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex ${isRTL ? 'flex-row-reverse' : ''} justify-between items-center h-16`}>
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-netflix-red text-2xl font-bold hover:text-netflix-red-hover transition-colors duration-200">
                            Sahand's MovieDB
                        </Link>
                    </div>
                    
                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-300 hover:text-white focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* Desktop menu */}
                    <div className={`hidden md:flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Link 
                            to="/" 
                            className="text-gray-300 hover:text-white py-2 px-3 rounded-md text-lg font-medium transition-colors duration-200 hover:bg-gray-800"
                        >
                            {translations.home}
                        </Link>
                        <Link 
                            to="/favorites" 
                            className="text-gray-300 hover:text-white py-2 px-3 rounded-md text-lg font-medium transition-colors duration-200 hover:bg-gray-800"
                        >
                            {translations.favorites}
                        </Link>
                        <button
                            onClick={toggleLanguage}
                            className="text-gray-300 hover:text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-800"
                            title={language === 'en' ? 'Switch to Persian' : 'Switch to English'}
                        >
                            {language === 'en' ? 'en' : 'fa'}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out`}>
                    <div className={`px-2 pt-2 pb-3 space-y-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                        <Link 
                            to="/" 
                            className="block text-gray-300 hover:text-white py-2 px-3 rounded-md text-lg font-medium transition-colors duration-200 hover:bg-gray-800"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {translations.home}
                        </Link>
                        <Link 
                            to="/favorites" 
                            className="block text-gray-300 hover:text-white py-2 px-3 rounded-md text-lg font-medium transition-colors duration-200 hover:bg-gray-800"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {translations.favorites}
                        </Link>
                        <button
                            onClick={() => {
                                toggleLanguage();
                                setIsMenuOpen(false);
                            }}
                            className="w-full text-gray-300 hover:text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-800"
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