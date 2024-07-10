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
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [platform, setPlatform] = useState("");
  const [genres, setGenres] = useState("");
  const [sorts, setSorts] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/home?page=${page}`
        );
        setData(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log("Error", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query && !platform && !genres && !sorts) {
        return;
      }

      try {
        let url = `http://localhost:3000/home/searchresults?query=${query}&page=${page}`;
        if (platform) {
          url += `&platform=${platform}`;
        }
        if (genres) {
          url += `&genres=${genres}`;
        }
        if (sorts) {
          url += `&ordering=${sorts}`;
        }
        const response = await axios.get(url);
        setSearchResults(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchSearchResults();
  }, [query, platform, genres, sorts, page]);

  const gamesToDisplay = query ? searchResults : data;

  const goToNextPage = () => {
    setPage(page + 1);
  };

  const goToPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

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
        <div className="pagination">
          <button onClick={goToPreviousPage} disabled={page === 1}>
            Previous
          </button>
          <span>Page {page}</span>
          <button onClick={goToNextPage}>Next</button>
        </div>
      </div>
    </section>
  );
};

export default Home;
