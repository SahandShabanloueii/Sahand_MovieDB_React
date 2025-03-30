import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MovieDetail from "./pages/MovieDetail";
import NavBar from "./components/NavBar";
import { MovieProvider } from "./contexts/MovieContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <LanguageProvider>
      <MovieProvider>
        <div className="min-h-screen bg-background flex flex-col">
          <NavBar />
          <ErrorBoundary>
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
              </Routes>
            </main>
          </ErrorBoundary>
        </div>
      </MovieProvider>
    </LanguageProvider>
  )
}

export default App
