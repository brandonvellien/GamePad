import React from "react";

const PlatFormFilter = ({ platform, setPlatform }) => {
  return (
    <div className="select-filter">
      <select
        id="platform"
        value={platform}
        onChange={(event) => setPlatform(event.target.value)}
      >
        <option value="">All Platforms</option>
        <option value="4">PC</option>
        <option value="5">Mac</option>
        <option value="1">Xbox One</option>
        <option value="14">Xbox 360</option>
        <option value="186">Xbox Series</option>
        <option value="16">PS3</option>
        <option value="18">PS4</option>
        <option value="187">PS5</option>
        <option value="7">Nitendo Switch</option>
      </select>
    </div>
  );
};
export default PlatFormFilter;
