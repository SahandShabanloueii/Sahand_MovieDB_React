import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

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
                <div className="min-h-screen bg-background flex items-center justify-center p-4">
                    <div className="max-w-md w-full bg-dark-gray rounded-lg p-8 text-center">
                        <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
                        <p className="text-gray-300 mb-6">We're sorry, but there was an error loading this content.</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="bg-netflix-red text-white px-6 py-3 rounded-md text-base transition-all duration-300 ease-in-out hover:bg-netflix-red-hover hover:-translate-y-0.5"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary; 