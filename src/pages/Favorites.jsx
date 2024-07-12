import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Favorites = ({ token }) => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          "https://site--backend-gamepad--ynyvw48hxvj2.code.run/favorites",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFavorites(response.data.favorites);
        setIsLoading(false);
      } catch (error) {
        console.log("Erreur lors de la récupération des favoris:", error);
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [token]);

  const handleRemoveFavorite = async (gameId, gameName, gameImage) => {
    try {
      await axios.post(
        "https://site--backend-gamepad--ynyvw48hxvj2.code.run/favorites",
        { gameId, gameName, gameImage },
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
    <div className="home-section">
      {favorites.length === 0 ? (
        <p>This section is empty</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((game) => (
            <div key={game.gameId} className="favorite-item">
              <h2>{game.gameName}</h2>
              {game.gameImage && (
                <img
                  src={game.gameImage}
                  alt={game.gameName}
                  className="game-image"
                />
              )}
              <div className="buttons-container">
                <button
                  className="remove-button"
                  onClick={() =>
                    handleRemoveFavorite(
                      game.gameId,
                      game.gameName,
                      game.gameImage
                    )
                  }
                >
                  Remove from collection
                </button>
                <Link to={`/games/${game.gameId}`} className="details-link">
                  See details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
