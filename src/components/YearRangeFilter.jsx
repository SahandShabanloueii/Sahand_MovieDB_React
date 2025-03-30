import React from 'react';

const YearRangeFilter = ({ onYearRangeChange, selectedRange }) => {
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
        <div className="bg-dark-gray p-6 rounded-lg mt-4">
            <h3 className="text-white text-xl font-semibold mb-4">Filter by Year</h3>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label className="text-gray-300 text-sm">From:</label>
                    <select 
                        value={selectedRange.start} 
                        onChange={handleStartYearChange}
                        className="bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-netflix-red focus:ring-1 focus:ring-netflix-red"
                    >
                        {years.map(year => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-gray-300 text-sm">To:</label>
                    <select 
                        value={selectedRange.end} 
                        onChange={handleEndYearChange}
                        className="bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-netflix-red focus:ring-1 focus:ring-netflix-red"
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