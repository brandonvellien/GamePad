import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

import "./App.css";

// Composants
import Header from "./components/Header";

// Pages
import Home from "./pages/Home";
import Game from "./pages/Game";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useState } from "react";
import Favorites from "./pages/Favorites";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [favorites, setFavorites] = useState([]);

  const handleToken = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 7 });
      setToken(token);
    } else {
      Cookies.remove("token");
      setToken(null);
    }
  };
  const toggleFavorite = (game) => {
    const newFavorites = [...favorites];
    let gameFound = false;

    for (let i = 0; i < newFavorites.length; i++) {
      if (newFavorites[i].id === game.id) {
        newFavorites.splice(i, 1);
        gameFound = true;
      }
    }

    if (!gameFound) {
      newFavorites.push(game);
    }

    setFavorites(newFavorites);
  };

  return (
    <Router>
      <Header token={token} handleToken={handleToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/games/:gameId"
          element={
            <Game
              token={token}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          }
        />
        <Route path="/signup" element={<Signup handleToken={handleToken} />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              token={token}
              toggleFavorite={toggleFavorite}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
