import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import FavorisButton from "../components/FavorisButton";
import reviewsimg from "/src/assets/img/reviews.png";
import similargames from "/src/assets/img/similargames.png";

const Game = ({ token, favorites, toggleFavorite }) => {
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
    toggleFavorite(data);
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
      const response = await axios.post(
        `http://localhost:3000/reviews/${reviewId}/vote`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updatedReviews = reviews.map((review) => {
        if (review._id === reviewId) {
          return { ...review, votes: response.data.votes };
        }
        return review;
      });

      setReviews(updatedReviews);
    } catch (error) {
      alert(
        "Erreur lors du vote. Vous avez peut-être déjà voté pour cette review."
      );
    }
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <section className="home-section">
      <div className="game-details">
        <h2>{data.name}</h2>
        <FavorisButton
          game={data}
          token={token}
          onFavoriteChange={handleFavoriteChange}
        />
      </div>
      <div className="gamepictext">
        <div className="game-media">
          <img src={data.background_image} alt={data.name} />
        </div>{" "}
        <div className="game-description">
          <p className="details">Released date : </p>
          <p>{data.released}</p>
          <p className="details">Rating : </p>
          <p>{data.rating}</p>
          <p className="details">Description : </p>
          <p className="details-description">{data.description_raw}</p>
          {data.genres && (
            <p>
              <span style={{ fontWeight: "bold", fontSize: 20 }}>Genres :</span>{" "}
              {data.genres.map((genre) => genre.name).join(", ")}
            </p>
          )}

          {data.platforms && (
            <p>
              <span style={{ fontWeight: "bold", fontSize: 20 }}>
                {" "}
                Plateformes :{" "}
              </span>

              {data.platforms
                .map((platform) => platform.platform.name)
                .join(", ")}
            </p>
          )}
          {data.developers && (
            <p>
              <span style={{ fontWeight: "bold", fontSize: 20 }}>
                Développeurs :{" "}
              </span>
              {data.developers.map((dev) => dev.name).join(", ")}
            </p>
          )}
        </div>
      </div>

      <div className="reviews">
        <img src={reviewsimg} alt="reviews-img" />
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
              <br />
              <button type="submit">Submit Review</button>
            </form>
            <div>
              <span>Rate this Game : </span>
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
            </div>
          </>
        )}
        {reviews.map((review) => (
          <div key={review._id} className="review-item">
            <p className="review-contents">{review.content}</p>
            <br />
            <br />
            <p className="details">Note: </p>
            <p>{review.rating}/5</p>
            <br />
            <p className="details">Votes: </p>
            <p>{review.votes || 0}</p>
            <br />
            <p className="details">By: </p>
            <br />
            <p>
              {" "}
              {review.user && review.user.account
                ? review.user.account.username
                : "Anonymous"}
            </p>
            {token && (
              <button onClick={() => handleVote(review._id, 1)}>Vote</button>
            )}
          </div>
        ))}
      </div>

      <div className="similar-games">
        <img src={similargames} alt="similar-game" />
        <ul className="games-grid2">
          {similarGames.length > 0 ? (
            similarGames.map((game) => (
              <li key={game.id} className="game-card">
                <h4>{game.name}</h4>
                <img
                  className="similar-img"
                  src={game.background_image}
                  alt={game.name}
                />
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
