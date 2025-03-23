import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MovieDetail from "./pages/MovieDetail";
import NavBar from "./components/NavBar";
import { MovieProvider } from "./contexts/MovieContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import ErrorBoundary from "./components/ErrorBoundary";
import "./css/App.css";

function App() {
  return (
    <LanguageProvider>
      <MovieProvider>
        <div className="app">
          <NavBar />
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
            </Routes>
          </ErrorBoundary>
        </div>
      </MovieProvider>
    </LanguageProvider>
  )
}

export default App
