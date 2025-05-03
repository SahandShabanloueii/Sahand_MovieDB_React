import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const FilterToggle = ({ isOpen, onToggle }) => {
    const { translations } = useLanguage();

    return (
        <div className="flex justify-center w-full py-2 bg-darker rounded-md">
            <button
                onClick={onToggle}
                className="lg:hidden px-auto text-netflix-red hover:text-netflix-red-hover text-sm font-medium border-2 border-dashed border-netflix-red rounded-md hover:bg-netflix-red hover:text-white px-6 py-3 rounded-md text-base transition-all duration-200 ease-in-out hover:-translate-y-0.5"
            >
                {isOpen ? translations.closeFilters : translations.filterMovies}
            </button>
        </div>
    );
};

export default FilterToggle; 