import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Game = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { gameId } = useParams();

  useEffect(() => {
    const fetchGameId = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${gameId}?key=f2394ff2497c48a1b2d59b8ddec2bc71`
        );
        setData(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log("error", error);
        setIsLoading(false);
      }
    };
    fetchGameId();
  }, [gameId]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <section>
      <div>
        <h2>{data.name}</h2>
      </div>
      <div key={data.id}>
        <img src={data.background_image} alt={data.name} />
      </div>
      <div>
        <div className="game-description">
          <ul>
            Platforms
            {data.platforms &&
              data.platforms.map((console) => (
                <li key={console.platform.id}>{console.platform.name}</li>
              ))}
          </ul>
          <p>Release Date: {data.released}</p>
          <ul>
            Developers
            {data.developers &&
              data.developers.map((developer) => (
                <li key={developer.id}>{developer.name}</li>
              ))}
          </ul>
          <ul>
            Genre
            {data.genres &&
              data.genres.map((genre) => {
                return <li>{genre.name}</li>;
              })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Game;
