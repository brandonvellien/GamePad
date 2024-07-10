import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Favorites = ({ token }) => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("http://localhost:3000/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(response.data.favorites);
        setIsLoading(false);
      } catch (error) {
        console.log("Erreur lors de la récupération des favoris:", error);
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [token]);

  const handleRemoveFavorite = async (gameId) => {
    try {
      await axios.post(
        "http://localhost:3000/favorites",
        { gameId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Mettre à jour la liste des favoris après la suppression
      setFavorites(favorites.filter((fav) => fav.gameId !== gameId));
    } catch (error) {
      console.error("Erreur lors de la suppression du favori:", error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Mes Jeux Favoris</h1>
      {favorites.length === 0 ? (
        <p>Vous n'avez pas encore de jeux favoris.</p>
      ) : (
        favorites.map((game) => (
          <div key={game.gameId}>
            <h2>{game.gameName}</h2>
            {game.gameImage && (
              <img
                src={game.gameImage}
                alt={game.gameName}
                style={{ width: "200px", height: "auto" }}
              />
            )}
            <button onClick={() => handleRemoveFavorite(game.gameId)}>
              Retirer des favoris
            </button>
            <Link to={`/games/${game.gameId}`}>Voir les détails</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Favorites;
