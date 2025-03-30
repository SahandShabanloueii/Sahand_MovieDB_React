import React from 'react';
import '../css/YearRangeFilter.css';

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
        <div className="year-range-filter">
            <h3>Filter by Year</h3>
            <div className="year-range-inputs">
                <div className="year-input-group">
                    <label>From:</label>
                    <select 
                        value={selectedRange.start} 
                        onChange={handleStartYearChange}
                    >
                        {years.map(year => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="year-input-group">
                    <label>To:</label>
                    <select 
                        value={selectedRange.end} 
                        onChange={handleEndYearChange}
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