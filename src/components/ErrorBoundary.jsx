import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../css/ErrorBoundary.css';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <h2>Something went wrong</h2>
                    <p>We're sorry, but there was an error loading this content.</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="retry-button"
                    >
                        Try Again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary; 