import React, { useState, useEffect } from "react";
import axios from "axios";

const FavorisButton = ({ gameId, token, onFavoriteChange }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const response = await axios.get("http://localhost:3000/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsFavorite(response.data.favorites.includes(gameId));
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };
    if (token) checkFavoriteStatus();
  }, [gameId, token]);

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await axios.delete(`http://localhost:3000/favorites/${gameId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(
          "http://localhost:3000/favorites",
          { gameId },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      setIsFavorite(!isFavorite);
      if (onFavoriteChange) onFavoriteChange(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  if (!token) return null;

  return (
    <button onClick={toggleFavorite}>
      {isFavorite ? "Remove from Collection" : "Add to Collection"}
    </button>
  );
};

export default FavorisButton;
