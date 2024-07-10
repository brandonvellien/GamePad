import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import FavorisButton from "../components/FavorisButton";

const Game = ({ token }) => {
  const [data, setData] = useState({});
  const [similarGames, setSimilarGames] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ content: "", rating: "5" });
  const [isLoading, setIsLoading] = useState(true);
  const { gameId } = useParams();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/home/${gameId}`
        );
        setData(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log("error", error);
        setIsLoading(false);
      }
    };

    const fetchSimilarGames = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/home/${gameId}/similargames`
        );
        setSimilarGames(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/reviews/${gameId}`
        );
        setReviews(response.data);
      } catch (error) {
        console.log("error fetching reviews", error);
      }
    };

    fetchGameDetails();
    fetchSimilarGames();
    fetchReviews();
  }, [gameId]);

  const handleFavoriteChange = (isFavorite) => {
    console.log(isFavorite ? "Added to collection" : "Removed from collection");
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:3000/reviews",
        {
          game: gameId,
          content: newReview.content,
          rating: Number(newReview.rating),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setReviews([response.data, ...reviews]);
      setNewReview({ content: "", rating: "5" });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(
          "An error occurred while submitting your review. Please try again."
        );
      }
      console.log("Error submitting review:", error);
    }
  };
  const handleVote = async (reviewId) => {
    try {
      // Envoyer la requête de vote au serveur
      const response = await axios.post(
        `http://localhost:3000/reviews/${reviewId}/vote`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Mettre à jour le nombre de votes dans l'état local
      const updatedReviews = reviews.map((review) => {
        if (review._id === reviewId) {
          // Si c'est la review pour laquelle on a voté, on met à jour son nombre de votes
          return { ...review, votes: response.data.votes };
        }
        // Sinon, on retourne la review telle quelle
        return review;
      });

      // Mettre à jour l'état avec les nouvelles reviews
      setReviews(updatedReviews);
    } catch (error) {
      // En cas d'erreur, afficher un message à l'utilisateur
      alert(
        "Erreur lors du vote. Vous avez peut-être déjà voté pour cette review."
      );
    }
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <section>
      <div>
        <h2>{data.name}</h2>
        <FavorisButton
          gameId={gameId}
          token={token}
          onFavoriteChange={handleFavoriteChange}
        />
      </div>
      <div key={data.id}>
        <img src={data.background_image} alt={data.name} />
      </div>
      <div className="game-description">
        {/* Votre code existant pour afficher les détails du jeu */}
      </div>
      <div>
        <h3>Reviews</h3>
        {token && (
          <>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <form onSubmit={handleReviewSubmit}>
              <textarea
                name="content"
                value={newReview.content}
                onChange={handleReviewChange}
                placeholder="Write your review here"
                required
              />
              <select
                name="rating"
                value={newReview.rating}
                onChange={handleReviewChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button type="submit">Submit Review</button>
            </form>
          </>
        )}
        {reviews.map((review) => (
          <div key={review._id}>
            <p>{review.content}</p>
            <p>Note: {review.rating}/5</p>
            <p>Rating: {review.rating}/5</p>
            <p>Votes: {review.votes || 0}</p>

            <p>By: {review.user.account.username}</p>
            {token && (
              <button onClick={() => handleVote(review._id)}>Voter</button>
            )}
          </div>
        ))}
      </div>
      <div>
        <h3>Similar Games</h3>
        <ul>
          {similarGames.length > 0 ? (
            similarGames.map((game) => (
              <li key={game.id}>
                <h4>{game.name}</h4>
                <img src={game.background_image} alt={game.name} />
              </li>
            ))
          ) : (
            <p>No similar games found.</p>
          )}
        </ul>
      </div>
    </section>
  );
};

export default Game;
