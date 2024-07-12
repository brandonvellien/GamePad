import React from "react";

const GenresFilter = ({ genres, setGenres }) => {
  return (
    <div>
      <select
        value={genres}
        onChange={(event) => setGenres(event.target.value)}
        id="genres"
      >
        <option value="">All Genres</option>
        <option value="4">Action</option>
        <option value="10">Strategy</option>
        <option value="24">RPG</option>
        <option value="2">Shooter</option>
        <option value="3">Adventure</option>
        <option value="7">Puzzle</option>
        <option value="1">Racing</option>
        <option value="15">Sports</option>
      </select>
    </div>
  );
};
export default GenresFilter;
