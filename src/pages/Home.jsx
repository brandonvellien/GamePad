import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import PlatFormFilter from "../components/PlatformFilter";
import GenresFilter from "../components/GenresFilter";
import SortsFilters from "../components/SortsFilters";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState(""); // la requête de la recherche
  const [searchResults, setSearchResults] = useState([]); // resultats de la recherche
  const [platform, setPlatform] = useState("");
  const [genres, setGenres] = useState("");
  const [sorts, setSorts] = useState("");

  // requete pour les jeux pertinents du moments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.rawg.io/api/games?key=f2394ff2497c48a1b2d59b8ddec2bc71&ordering=-relevance&dates=2024-06-10,2024-07-01&page_size=20"
        );

        setData(response.data.results);
        console.log(response.data.results);
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
      try {
        let url = `https://api.rawg.io/api/games?key=f2394ff2497c48a1b2d59b8ddec2bc71&search=${query}`;
        // si selection d'une plateform existe alors je rajouter l'url à la query
        if (platform) {
          url = url + `&platforms=${platform}`;
        }
        if (genres) {
          url = url + `&genres=${genres}`;
        }
        if (sorts) {
          url = url + `&ordering=${sorts}`;
        }
        const response = await axios.get(url);

        setSearchResults(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log("error", error);
        setIsLoading(false);
      }
    };
    // j'inclus mes filtres quand je tape une recherche
    fetchSearchResults();
  }, [query, platform, genres, sorts]);

  const gamesToDisplay = query ? searchResults : data;
  return isLoading ? (
    <p> Loading...</p>
  ) : (
    <section>
      <SearchBar className="main-container" query={query} setQuery={setQuery} />
      {query && (
        <>
          <PlatFormFilter platform={platform} setPlatform={setPlatform} />
          <GenresFilter genres={genres} setGenres={setGenres} />
          <SortsFilters sorts={sorts} setSorts={setSorts} />
        </>
      )}

      <div>{query ? <p>Search Results</p> : <p>Most Relevances Games</p>}</div>
      <div className="main-container">
        {gamesToDisplay.map((game) => (
          <Link to={`/games/${game.id}`}>
            <div className="card" key={game.id}>
              <img src={game.background_image} alt={game.name} />
              <div className="card-content">
                <h3>{game.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
export default Home;
