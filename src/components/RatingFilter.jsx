import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const RatingFilter = ({ onRatingRangeChange, selectedRange }) => {
    const { translations } = useLanguage();
    const ratings = Array.from({ length: 11 }, (_, i) => i); // 0 to 10

    const handleStartRatingChange = (e) => {
        const startRating = parseFloat(e.target.value);
        onRatingRangeChange({ start: startRating, end: selectedRange.end });
    };

    const handleEndRatingChange = (e) => {
        const endRating = parseFloat(e.target.value);
        onRatingRangeChange({ start: selectedRange.start, end: endRating });
    };

    return (
        <div className="bg-darker shadow-lg p-6 rounded-lg mb-6">
            <h3 className="text-white text-xl font-semibold mb-4">{translations.filterByRating}</h3>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label className="text-gray-300 text-sm">{translations.from}:</label>
                    <select 
                        value={selectedRange.start} 
                        onChange={handleStartRatingChange}
                        className="bg-darker text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-netflix-red focus:ring-1 focus:ring-netflix-red"
                    >
                        {ratings.map(rating => (
                            <option key={rating} value={rating}>
                                {rating} ★
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-gray-300 text-sm">{translations.to}:</label>
                    <select 
                        value={selectedRange.end} 
                        onChange={handleEndRatingChange}
                        className="bg-darker text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-netflix-red focus:ring-1 focus:ring-netflix-red"
                    >
                        {ratings.map(rating => (
                            <option key={rating} value={rating}>
                                {rating} ★
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default RatingFilter; 