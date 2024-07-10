import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import PlatformFilter from "../components/PlatformFilter";
import GenresFilter from "../components/GenresFilter";
import SortsFilters from "../components/SortsFilters";

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState(""); // la requête de la recherche
  const [searchResults, setSearchResults] = useState([]); // resultats de la recherche
  const [platform, setPlatform] = useState("");
  const [genres, setGenres] = useState("");
  const [sorts, setSorts] = useState("");

  // Requête pour les jeux pertinents du moment
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/home");
        setData(response.data); // Pas de `.results` ici car la réponse de l'API est directement les résultats
        setIsLoading(false);
      } catch (error) {
        console.log("Error", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query && !platform && !genres && !sorts) {
        return;
      }

      try {
        let url = `http://localhost:3000/home/searchresults?query=${query}`;
        if (platform) {
          url += `&platform=${platform}`;
        }
        if (genres) {
          url += `&genres=${genres}`;
        }
        if (sorts) {
          url += `&ordering=${sorts}`;
        }
        //console.log("Fetching URL: ", url); // Debugging
        const response = await axios.get(url);
        //console.log("Search results: ", response.data); // Debugging
        setSearchResults(response.data); // Pas de `.results` ici car la réponse de l'API est directement les résultats
        //console.log(sorts) // debugg
        setIsLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchSearchResults();
  }, [query, platform, genres, sorts]);

  const gamesToDisplay = query ? searchResults : data;

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <section className="home-section">
      <div className="search-filters-container">
        <SearchBar query={query} setQuery={setQuery} />
        {query && (
          <div className="filters">
            <PlatformFilter platform={platform} setPlatform={setPlatform} />
            <GenresFilter genres={genres} setGenres={setGenres} />
            <SortsFilters sorts={sorts} setSorts={setSorts} />
          </div>
        )}
      </div>
      <div className="results-container">
        <div className="query-games">
          {query ? <p>Search Results</p> : <p>Most Relevant Games</p>}
        </div>
        <div className="games-grid">
          {gamesToDisplay.map((game) => (
            <Link to={`/games/${game.id}`} key={game.id} className="game-card">
              <img
                src={game.background_image}
                alt={game.name}
                className="game-image"
              />
              <div className="card-content">
                <h3>{game.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
