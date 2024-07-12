import React from "react";

const SearchBar = ({ query, setQuery }) => {
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for games..."
      />
    </form>
  );
};

export default SearchBar;
