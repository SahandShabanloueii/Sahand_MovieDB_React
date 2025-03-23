import { Link } from "react-router-dom";
import { useLanguage } from '../contexts/LanguageContext';
import "../css/NavBar.css";

function NavBar() {
    const { language, toggleLanguage } = useLanguage();
    const { translations } = useLanguage();
    return (
        <nav className="navbar">
            <div className="nav-brand">
                <Link to="/">Sahand's MovieDB</Link>
            </div>
            <div className="nav-links">
                <Link to="/">{translations.home}</Link>
                <Link to="/favorites">{translations.favorites}</Link>
                <button
                    onClick={toggleLanguage}
                    className="language-toggle"
                    title={language === 'en' ? 'Switch to Persian' : 'Switch to English'}
                >
                    {language === 'en' ? 'en🇺🇸' : 'fa🇮🇷'}
                </button>
            </div>
        </nav>
    );
}

export default NavBar;