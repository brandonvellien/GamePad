import React, { useState, useEffect } from "react";
import axios from "axios";

const FavorisButton = ({ game, token, onFavoriteChange }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const response = await axios.get(
          "https://site--backend-gamepad--ynyvw48hxvj2.code.run/favorites",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIsFavorite(
          response.data.favorites.some((fav) => fav.gameId === game.id)
        );
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };
    if (token) checkFavoriteStatus();
  }, [game.id, token]);

  const toggleFavorite = async () => {
    try {
      await axios.post(
        "https://site--backend-gamepad--ynyvw48hxvj2.code.run/favorites",
        {
          gameId: game.id,
          gameName: game.name,
          gameImage: game.background_image,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsFavorite(!isFavorite);
      if (onFavoriteChange) onFavoriteChange(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  if (!token) return null;

  return (
    <button className="favorites-button" onClick={toggleFavorite}>
      {isFavorite ? "Remove from Collection" : "Add to Collection"}
    </button>
  );
};

export default FavorisButton;
