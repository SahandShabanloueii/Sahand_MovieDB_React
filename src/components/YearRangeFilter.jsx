import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const YearRangeFilter = ({ onYearRangeChange, selectedRange }) => {
    const { translations } = useLanguage();
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);

    const handleStartYearChange = (e) => {
        const startYear = parseInt(e.target.value);
        onYearRangeChange({ start: startYear, end: selectedRange.end });
    };

    const handleEndYearChange = (e) => {
        const endYear = parseInt(e.target.value);
        onYearRangeChange({ start: selectedRange.start, end: endYear });
    };

    return (
        <div className="bg-darker shadow-lg p-6 rounded-lg">
            <h3 className="text-white text-xl font-semibold mb-4">{translations.filterByYear}</h3>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label className="text-gray-300 text-sm">{translations.from}:</label>
                    <select 
                        value={selectedRange.start} 
                        onChange={handleStartYearChange}
                        className="bg-darker text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-netflix-red focus:ring-1 focus:ring-netflix-red"
                    >
                        {years.map(year => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-gray-300 text-sm">{translations.to}:</label>
                    <select 
                        value={selectedRange.end} 
                        onChange={handleEndYearChange}
                        className="bg-darker text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-netflix-red focus:ring-1 focus:ring-netflix-red"
                    >
                        {years.map(year => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default YearRangeFilter; 