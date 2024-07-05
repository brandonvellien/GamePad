import React from "react";
const SortsFilters = ({ sorts, setSorts }) => {
  return (
    <div>
      <select
        value={sorts}
        onChange={(event) => setSorts(event.target.value)}
        id="results"
      >
        <option value=""> Default</option>
        <option value="released">Released date</option>
        <option value="name"> Name</option>
        <option value="rating">Ratings</option>
      </select>
    </div>
  );
};

export default SortsFilters;
